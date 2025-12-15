/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import * as xlsx from "xlsx";
import fs from "fs";
import path from "path";
import { buildEmailHtml } from "@/utils";

export const config = {
  api: {
    bodyParser: false,
  },
};

/** chunk array into smaller arrays */
function chunkArray<T>(arr: T[], size: number) {
  if (size <= 0) return [arr];
  const chunks: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    chunks.push(arr.slice(i, i + size));
  }
  return chunks;
}

/** send single email via Brevo */
async function sendSingleEmail(
  content: string,
  sender_email: string,
  sender_name: string,
  subjects: string,
  recipient: any
) {
  const payload = {
    sender: {
      email: sender_email ?? process.env.NEXTJS_EMAIL_FROM ?? "",
      name: sender_name ?? process.env.NEXTJS_EMAIL_NAME ?? "",
    },
    to: [{ email: recipient.Email, name: recipient["HỌ VÀ TÊN"] || "" }],
    subject: subjects,
    htmlContent: content,
  };

  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      accept: "application/json",
      "api-key": process.env.NEXTJS_BREVO_API_KEY ?? "",
      "content-type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  // attempt to parse body safely
  let body;
  try {
    body = await res.json();
  } catch (e) {
    body = { parseError: true };
  }

  return {
    to: recipient.Email,
    ok: res.ok,
    status: res.status,
    body,
  };
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const typeRaw = formData.get("type");
    const monthRaw = formData.get("month") || new Date().getMonth() + 1;
    const subjectsRaw = formData.get("subjects");
    const content = formData.get("content");
    const senderEmail = formData.get("sender_email");
    const senderName = formData.get("sender_name");

    if (!file) {
      return NextResponse.json(
        { success: false, error: "Không có file Excel nào được tải lên" },
        { status: 400 }
      );
    }

    // 2) Validate type (bắt buộc: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13)
    if (typeRaw == null || typeRaw === "") {
      return NextResponse.json(
        {
          success: false,
          error:
            "Thiếu 'type' (bắt buộc 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13)",
        },
        { status: 400 }
      );
    }
    const typeNum = Number(typeRaw);
    if (![1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].includes(typeNum)) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Giá trị 'type' không hợp lệ. Chỉ nhận 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13",
        },
        { status: 400 }
      );
    }

    // 3) Validate month (bắt buộc: 1..12; cho phép '01'..'12')
    if (monthRaw == null || monthRaw === "") {
      return NextResponse.json(
        { success: false, error: "Thiếu 'month' (bắt buộc 1..12)" },
        { status: 400 }
      );
    }
    const monthNum = Number(String(monthRaw).trim());
    if (!Number.isInteger(monthNum) || monthNum < 1 || monthNum > 12) {
      return NextResponse.json(
        {
          success: false,
          error: "Giá trị 'month' không hợp lệ. Chỉ nhận 1..12",
        },
        { status: 400 }
      );
    }
    // Nếu cần chuẩn hoá về 2 chữ số:
    const month = String(monthNum).padStart(2, "0");

    // 4) Validate subjects (bắt buộc non-empty)
    if (subjectsRaw == null) {
      return NextResponse.json(
        { success: false, error: "Thiếu 'subjects' (tiêu đề email)" },
        { status: 400 }
      );
    }
    const subjects = String(subjectsRaw).trim();
    if (!subjects) {
      return NextResponse.json(
        { success: false, error: "'subjects' không được để trống" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const workbook = xlsx.read(buffer, { type: "buffer" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const data = xlsx.utils.sheet_to_json(sheet) as any[];

    const recipients: any = data
      .filter((row: any) => !!row.Email)
      .map((row: any) => ({
        Email: row.Email,
        "HỌ VÀ TÊN": row["HỌ VÀ TÊN"] || "",
        "MÃ KHOẢN VAY": row["MÃ KHOẢN VAY"],
        CCCD: row["CCCD"] || "",
        "ĐIỆN THOẠI": row["ĐIỆN THOẠI"] || "",
        "ĐỊA CHỈ": row["ĐỊA CHỈ"] || "",
        "HỌ TÊN THAM CHIẾU 1": row["HỌ TÊN THAM CHIẾU 1"] || "",
        "HỌ TÊN THAM CHIẾU 2": row["HỌ TÊN THAM CHIẾU 2"] || "",
        "SỐ TIỀN VAY": row["SỐ TIỀN VAY"] || "",
        "KỲ HẠN": row["KỲ HẠN"] || "",
        "SỐ TIỀN DƯ NỢ GỐC": row["SỐ TIỀN DƯ NỢ GỐC"] || "",
        "SỐ TIỀN CẦN THANH TOÁN NGAY": row["SỐ TIỀN CẦN THANH TOÁN NGAY"] || "",
      }));

    if (recipients.length === 0) {
      return NextResponse.json(
        { success: false, error: "Không tìm thấy email hợp lệ trong file" },
        { status: 400 }
      );
    }

    // Gửi email cho mỗi người nhận và thêm cột trạng thái
    const updatedRecipients = [];
    for (const recipient of recipients) {
      const formatVND = (value: number) => {
        return new Intl.NumberFormat("vi-VN").format(value);
      };
      function renderTemplate(
        template: string,
        data: Record<string, string | number>
      ): string {
        return (
          `<!doctype html>
<html lang="vi">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>[TIN VAY - THÔNG BÁO] Đến hạn thanh toán</title>
  <style>
  body {
    font-family: 'Segoe UI', Arial, Helvetica, sans-serif;
    line-height: 1.7;
    color: #222;
    background: #f3f4f6;
    margin: 0;
    padding: 24px;
  }
  .card {
    max-width: 760px;
    margin: 0 auto;
    background: #fff;
    padding: 28px 32px;
    border-radius: 12px;
    box-shadow: 0 4px 16px rgba(0,0,0,0.1);
    border: 1px solid #e5e7eb;
  }
  h1 {
    font-size: 20px;
    margin: 0 0 16px;
    color: #d93025; /* đỏ nhấn */
    line-height: 1.4;
  }
  p {
    margin: 10px 0;
    font-size: 15px;
    color: #333;
  }
  ul {
    margin: 14px 0 0 22px;
    padding: 0;
  }
  li {
    margin: 8px 0;
    font-size: 14px;
  }
  .footer {
    margin-top: 8px;
    padding-top: 8px;
    border-top: 1px dashed #d1d5db;
    font-size: 14px;
    color: #555;
  }
  .footer strong {
    color: #111;
  }
</style>
</head>
<body>
  <div class="card">` +
          template.replace(/\$\{([^}]+)\}/g, (_, key: string) => {
            const value =
              key.trim() == "SỐ TIỀN CẦN THANH TOÁN NGAY" ||
              key.trim() == "SỐ TIỀN VAY" ||
              key.trim() == "SỐ TIỀN DƯ NỢ GỐC"
                ? formatVND(+data[key.trim()])
                : data[key.trim()];
            return value !== undefined ? String(value) : "";
          }) +
          `</div>
</body>
</html>`
        );
      }
      const result = await sendSingleEmail(
        renderTemplate(content as string, recipient),
        senderEmail as string,
        senderName as string,
        subjects,
        recipient
      );
      recipient["Trạng thái gửi mail"] = result.ok ? "Thành công" : "Thất bại";
      updatedRecipients.push(recipient);
    }

    // Chuyển đổi mảng người nhận thành bảng Excel mới
    const newSheet = xlsx.utils.json_to_sheet(updatedRecipients);
    const newWorkbook = xlsx.utils.book_new();
    xlsx.utils.book_append_sheet(newWorkbook, newSheet, "Sheet1");

    // Lưu file mới với cột trạng thái vào bộ nhớ
    const fileBuffer = xlsx.write(newWorkbook, {
      bookType: "xlsx",
      type: "buffer",
    });
    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename=updated_file.xlsx`,
      },
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || String(err) },
      { status: 500 }
    );
  }
}

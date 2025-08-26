/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import * as xlsx from "xlsx";
import fs from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

type Recipient = Record<string, any>;

const formatVND = (value: number) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);
};

export function buildEmailHtml(
  recipient: Recipient,
  type: 1 | 2 | 3,
  month = "8"
): string {
  const v = (k: string) => recipient?.[k] ?? "";
  switch (type) {
    case 1:
      return `<!doctype html>
<html lang="vi">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>[TIN VAY - THÔNG BÁO] Đến hạn thanh toán</title>
  <style>
    body{font-family: Arial, Helvetica, sans-serif;line-height:1.5;color:#111;background:#f6f6f6;padding:20px}
    .card{max-width:700px;margin:0 auto;background:#fff;padding:20px;border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,0.08)}
    h1{font-size:18px;margin:0 0 8px}
    p{margin:8px 0}
    .info{background:#fafafa;border:1px solid #eee;padding:12px;border-radius:6px;margin:12px 0}
    .row{margin:6px 0}
    .label{font-weight:600}
    .note{color:#555;font-size:13px;margin-top:12px}
    .footer{margin-top:18px;padding-top:12px;border-top:1px dashed #e6e6e6;color:#333}
    .contact{margin-top:8px}
  </style>
</head>
<body>
  <div class="card">
    <h1>[TIN VAY - THÔNG BÁO] Đến hạn thanh toán kỳ tháng ${month} – Mã hợp đồng: ${v(
        "MÃ KHOẢN VAY"
      )}</h1>

    <p>Kính gửi Ông/Bà <strong>${v("HỌ VÀ TÊN")}</strong>,</p>
    <p>Công ty xin thông báo đến Quý khách về khoản vay đến hạn thanh toán kỳ <strong>tháng ${month}</strong> như sau:</p>

    <div class="info">
      <div class="row"><span class="label">Số điện thoại:</span> ${v(
        "ĐIỆN THOẠI"
      )}</div>
      <div class="row"><span class="label">Mã hợp đồng:</span> ${v(
        "MÃ KHOẢN VAY"
      )}</div>
      <div class="row"><span class="label">Số tiền đã vay bên Công ty:</span> ${formatVND(
        v("SỐ TIỀN VAY")
      )}</div>
      <div class="row"><span class="label">Tổng kỳ hạn trả góp:</span> ${v(
        "KỲ HẠN"
      )}</div>
      <div class="row"><span class="label">CCCD:</span> ${v("cccd")}</div>
      <div class="row"><span class="label">Địa chỉ:</span> ${v("Địa Chỉ")}</div>
    </div>

    <p class="note">
      Hiện tại khoản vay trả góp của Quý Khách tháng này đã đến hạn thanh toán. Vui lòng tiến hành thanh toán đúng hạn trả góp kì vay theo hợp đồng tín dụng của mình.
      Để tránh ảnh hưởng đến lịch sử tín dụng và quyền lợi, kính mong Quý khách sắp xếp thanh toán sớm nhất có thể.
    </p>

    <p class="note"><em>Trong trường hợp Quý khách đã thanh toán, vui lòng bỏ qua email này.</em></p>

    <div class="footer">
      <p>Nếu cần hỗ trợ thêm thông tin hoặc hướng dẫn thanh toán, vui lòng liên hệ:</p>
      <div class="contact">
        <p><strong>Anh Hoàng Văn Lực</strong></p>
        <p>Zalo/SĐT: <strong>0981381910</strong></p>
        <p>Hoặc phản hồi lại email này để được hỗ trợ.</p>
      </div>
    </div>
  </div>
</body>
</html>`;

    case 2:
      return `<!doctype html>
<html lang="vi">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>[TIN VAY - THÔNG BÁO] Quá hạn thanh toán</title>
  <style>
    body{font-family: Arial, Helvetica, sans-serif;line-height:1.5;color:#111;background:#f6f6f6;padding:20px}
    .card{max-width:700px;margin:0 auto;background:#fff;padding:20px;border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,0.08)}
    h1{font-size:18px;margin:0 0 8px}
    p{margin:8px 0}
    .info{background:#fafafa;border:1px solid #eee;padding:12px;border-radius:6px;margin:12px 0}
    .row{margin:6px 0}
    .label{font-weight:600}
    .note{color:#555;font-size:13px;margin-top:12px}
    .footer{margin-top:18px;padding-top:12px;border-top:1px dashed #e6e6e6;color:#333}
    .contact{margin-top:8px}
  </style>
</head>
<body>
  <div class="card">
    <h1>[TIN VAY - THÔNG BÁO] Quá Hạn thanh toán kỳ tháng ${month} – Mã hợp đồng: ${v(
        "MÃ KHOẢN VAY"
      )}</h1>

    <p>Kính gửi Ông/Bà <strong>${v("HỌ VÀ TÊN")}</strong>,</p>
    <p>Công ty xin thông báo đến Quý khách về khoản vay đến hạn thanh toán kỳ <strong>tháng ${month}</strong> như sau:</p>

    <div class="info">
      <div class="row"><span class="label">Số điện thoại:</span> ${v(
        "ĐIỆN THOẠI"
      )}</div>
      <div class="row"><span class="label">Mã hợp đồng:</span> ${v(
        "MÃ KHOẢN VAY"
      )}</div>
      <div class="row"><span class="label">Số tiền đã vay bên Công ty:</span> ${formatVND(
        v("SỐ TIỀN VAY")
      )}</div>
      <div class="row"><span class="label">Tổng kỳ hạn trả góp:</span> ${v(
        "KỲ HẠN"
      )}</div>
      <div class="row"><span class="label">CCCD:</span> ${v("cccd")}</div>
      <div class="row"><span class="label">Địa chỉ:</span> ${v("Địa Chỉ")}</div>
    </div>

    <p class="note">
      Hiện tại chúng tôi ghi nhận khoản thanh toán kỳ tháng ${month} của Quý khách vẫn chưa được hoàn tất. Hồ sơ tín dụng được chuyển sang hồ sơ <strong>QUÁ HẠN</strong> đang xác minh điểm CIC về khả năng thanh toán trả góp đúng cam kết của hợp đồng vay.
      Kỳ hạn trả góp hiện tại đã bị cộng gộp <strong>2 kỳ</strong> trên các app Viettel Money, VCcard, MoMo do quý khách chậm trễ trong việc thanh toán và không có phản hồi về các thông báo trước đó của Công Ty. Yêu Cầu Ông/ Bà vào xử lý thanh toán đúng hạn <strong>Gấp</strong> trước khi Công Ty chuyển hồ sơ Sang <strong>NỢ CHÚ Ý, NỢ XẤU</strong>.
    </p>

    <p class="note"><em>Trong trường hợp Quý khách đã thanh toán, vui lòng bỏ qua email này.</em></p>

    <div class="footer">
      <p>Nếu cần hỗ trợ thêm thông tin tách 1 kì thanh toán hoặc hướng dẫn thanh toán, vui lòng liên hệ:</p>
      <div class="contact">
        <p><strong>Anh Hoàng Văn Lực</strong></p>
        <p>Zalo/SĐT: <strong>0981381910</strong></p>
        <p>Hoặc phản hồi lại email này để được hỗ trợ.</p>
      </div>
      <p class="note"><strong>Trân trọng,</strong><br/><strong>Trung tâm Dịch vụ Khách hàng – Vay Nhanh | Tin Vay</strong></p>
    </div>
  </div>
</body>
</html>`;

    case 3:
      return `<!doctype html>
<html lang="vi">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>[TIN VAY - THÔNG BÁO] Vi phạm quá hạn</title>
  <style>
    body{font-family: Arial, Helvetica, sans-serif;line-height:1.5;color:#111;background:#f6f6f6;padding:20px}
    .card{max-width:700px;margin:0 auto;background:#fff;padding:20px;border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,0.08)}
    h1{font-size:18px;margin:0 0 8px}
    p{margin:8px 0}
    .info{background:#fafafa;border:1px solid #eee;padding:12px;border-radius:6px;margin:12px 0}
    .row{margin:6px 0}
    .label{font-weight:600}
    .note{color:#555;font-size:13px;margin-top:12px}
    .footer{margin-top:18px;padding-top:12px;border-top:1px dashed #e6e6e6;color:#333}
    .contact{margin-top:8px}
  </style>
</head>
<body>
  <div class="card">
    <h1>[TIN VAY - THÔNG BÁO] Vi Phạm Quá Hạn Hợp Đồng Vay Tín Dụng thanh toán kỳ tháng ${month} – Mã hợp đồng: ${v(
        "MÃ KHOẢN VAY"
      )}</h1>

    <p>Kính gửi Ông/Bà <strong>${v("HỌ VÀ TÊN")}</strong>,</p>
    <p>Công ty xin thông báo đến Quý khách về khoản vay đến hạn thanh toán kỳ <strong>tháng ${month}</strong> như sau:</p>

    <div class="info">
      <div class="row"><span class="label">Số điện thoại:</span> ${v(
        "ĐIỆN THOẠI"
      )}</div>
      <div class="row"><span class="label">Mã hợp đồng:</span> ${v(
        "MÃ KHOẢN VAY"
      )}</div>
      <div class="row"><span class="label">Số tiền đã vay bên Công ty:</span> ${formatVND(
        v("SỐ TIỀN VAY")
      )}</div>
      <div class="row"><span class="label">Tổng kỳ hạn trả góp:</span> ${v(
        "KỲ HẠN"
      )}</div>
      <div class="row"><span class="label">CCCD:</span> ${v("cccd")}</div>
      <div class="row"><span class="label">Địa chỉ:</span> ${v("Địa Chỉ")}</div>
    </div>

    <p class="note">
      Đến nay, Công ty vẫn chưa nhận được khoản thanh toán kỳ tháng ${month} của Quý khách. Việc chậm thanh toán đã gây ảnh hưởng nghiêm trọng đến hợp đồng vay và lịch sử tín dụng của Quý khách.
      Chúng tôi đã nhiều lần liên hệ nhưng chưa nhận được phản hồi từ Quý khách. Nếu Quý khách tiếp tục không thực hiện thanh toán hoặc không liên hệ với chúng tôi trong vòng <strong>03 ngày</strong> kể từ ngày nhận được email này,
      Công ty sẽ buộc phải áp dụng các biện pháp xử lý theo hợp đồng và quy định pháp luật, bao gồm việc chuyển hồ sơ sang phòng thu hồi nợ chuyên trách hoặc khởi kiện theo quy định.
      Chúng tôi mong Quý khách liên hệ và thực hiện nghĩa vụ thanh toán sớm để tránh những hậu quả không mong muốn.
    </p>

    <p class="note"><em>Trong trường hợp Quý khách đã thanh toán, vui lòng bỏ qua email này.</em></p>

    <div class="footer">
      <p>Nếu cần hỗ trợ thêm thông tin tách 1 kì thanh toán hoặc hướng dẫn thanh toán, vui lòng liên hệ:</p>
      <div class="contact">
        <p><strong>Anh Hoàng Văn Lực</strong></p>
        <p>Zalo/SĐT: <strong>0981381910</strong></p>
        <p>Hoặc phản hồi lại email này để được hỗ trợ.</p>
      </div>
      <p class="note"><strong>Trân trọng,</strong><br/><strong>Phòng xử lý Thu Hồi Nợ Chú Ý – Vay Nhanh | Tin Vay</strong></p>
    </div>
  </div>
</body>
</html>`;

    default:
      throw new Error("type phải là 1 | 2 | 3");
  }
}

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
  subjects: string,
  recipient: any,
  type: 1 | 2 | 3,
  month = "8"
) {
  const payload = {
    sender: {
      email: process.env.NEXTJS_EMAIL_FROM ?? "",
      name: process.env.NEXTJS_EMAIL_NAME ?? "",
    },
    to: [{ email: recipient.Email, name: recipient["HỌ VÀ TÊN"] || "" }],
    subject: subjects,
    htmlContent: buildEmailHtml(recipient, type, month),
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
    const monthRaw = formData.get("month");
    const subjectsRaw = formData.get("subjects");

    if (!file) {
      return NextResponse.json(
        { success: false, error: "Không có file Excel nào được tải lên" },
        { status: 400 }
      );
    }

    // 2) Validate type (bắt buộc: 1 | 2 | 3)
    if (typeRaw == null || typeRaw === "") {
      return NextResponse.json(
        { success: false, error: "Thiếu 'type' (bắt buộc 1 | 2 | 3)" },
        { status: 400 }
      );
    }
    const typeNum = Number(typeRaw);
    if (![1, 2, 3].includes(typeNum)) {
      return NextResponse.json(
        {
          success: false,
          error: "Giá trị 'type' không hợp lệ. Chỉ nhận 1 | 2 | 3",
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
        "MÃ KHOẢN VAY": row["MÃ KHOẢN VAY"],
        "HỌ VÀ TÊN": row["HỌ VÀ TÊN"] || "",
        "ĐIỆN THOẠI": row["ĐIỆN THOẠI"] || "",
        "SỐ TIỀN VAY": row["SỐ TIỀN VAY"] || "",
        "KỲ HẠN": row["KỲ HẠN"] || "",
        "Số Tiền trả góp hàng tháng": row["Số Tiền trả góp hàng tháng"] || "",
        cccd: row["cccd"] || "",
        "Địa Chỉ": row["Địa Chỉ"] || "",
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
      const result = await sendSingleEmail(
        subjects,
        recipient,
        typeNum as 1 | 2 | 3,
        month
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

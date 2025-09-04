// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Recipient = Record<string, any>;

const style = `<style>
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
</style>`;

const formatVND = (value: number) => {
  return value + "đ";
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);
};
export function buildEmailHtml(
  recipient: Recipient,
  type: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13,
  month = new Date().getMonth() + 1
): string {
  const v = (k: string) => recipient?.[k] ?? "";
  switch (type) {
    case 1:
      return `<!doctype html>
<html lang="vi">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>[TIN VAY - THÔNG BÁO] Đến hạn thanh toán</title>
  ${style}
</head>
<body>
  <div class="card">
    <h1>⏰⏰[TIN VAY - THÔNG BÁO] Đến hạn thanh toán kỳ tháng ${month} – Mã hợp đồng: ${v(
        "MÃ KHOẢN VAY"
      )}</h1>

    <p>Kính gửi Ông/Bà <strong>${v("HỌ VÀ TÊN")}</strong>,</p>
    <p>TIN VAY xin thông báo đến Quý khách về khoản vay đến hạn thanh toán kỳ tháng ${month} như sau:</p>

    <ul>
      <li><strong>Mã hợp đồng:</strong> ${v("MÃ KHOẢN VAY")}</li>
      <li><strong>CCCD:</strong> ${v("CCCD")}</li>
      <li><strong>Số điện thoại:</strong> ${v("ĐIỆN THOẠI")}</li>
      <li><strong>Địa chỉ:</strong> ${v("ĐỊA CHỈ")}</li>
      <li><strong>Họ tên Tham chiếu 1:</strong> ${v("HỌ TÊN THAM CHIẾU 1")}</li>
      <li><strong>Họ tên Tham chiếu 2:</strong> ${v("HỌ TÊN THAM CHIẾU 2")}</li>
      <li><strong>Số tiền vay:</strong> ${formatVND(v("SỐ TIỀN VAY"))}</li>
      <li><strong>Tổng kỳ hạn trả góp:</strong> ${v("KỲ HẠN")}</li>
      <li><strong>Số tiền dư nợ gốc:</strong> ${formatVND(
        v("SỐ TIỀN DƯ NỢ GỐC")
      )}</li>
      <li><strong>SỐ TIỀN TRẢ GÓP THÁNG NÀY CẦN THANH TOÁN NGAY:</strong> ${formatVND(
        v("SỐ TIỀN CẦN THANH TOÁN NGAY")
      )}</li>
    </ul>

    <p>
      Khoản vay trả góp tháng này của Quý Khách đã đến hạn thanh toán, Quý khách vui lòng thanh toán ngay để duy trì lịch sử tín dụng tốt, cộng điểm CIC nâng hạng mức vay lần sau cũng như được hưởng đầy đủ quyền lợi theo hợp đồng. 
      Việc thanh toán sớm sẽ giúp Quý khách tránh phát sinh phí lãi, phí phạt và giữ uy tín tài chính. 
      Rất mong Quý khách sắp xếp thanh toán ngay hôm nay.
    </p>

    <div class="footer">
      <p>Nếu cần hỗ trợ thêm thông tin hoặc hướng dẫn thanh toán, vui lòng liên hệ:</p>
      <p>- Tổng đài CSKH: <strong>1900 6515</strong></p>
      <p>- Zalo CSKH hỗ trợ: <strong>Giai Vy – 0528 778 591</strong></p>
      <p>Trân trọng,<br/><strong>Trung tâm Dịch vụ Khách hàng – Vay Nhanh | Tin Vay</strong></p>
      <p><em>Trong trường hợp Quý khách đã thanh toán, vui lòng bỏ qua email này. Xin Cảm Ơn!</em></p>
    </div>
  </div>
</body>
</html>`;

    case 2:
      return `<!doctype html>
<html lang="vi">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>[TIN VAY - THÔNG BÁO HĐ QUÁ HẠN]</title>
  ${style}
</head>
<body>
  <div class="card">
    <h1>⚠️⚠️[TIN VAY - THÔNG BÁO HĐ QUÁ HẠN] HĐ VAY QUÁ HẠN THANH TOÁN KỲ THÁNG ${month} – Mã hợp đồng: ${v(
        "MÃ KHOẢN VAY"
      )}</h1>

    <p>Kính gửi Ông/Bà <strong>${v("HỌ VÀ TÊN")}</strong>,</p>
    <p>TIN VAY xin thông báo đến Quý khách về khoản vay <strong>QUÁ HẠN THANH TOÁN KỲ THÁNG ${month}</strong> như sau:</p>

    <ul>
      <li><strong>Mã hợp đồng:</strong> ${v("MÃ KHOẢN VAY")}</li>
      <li><strong>CCCD:</strong> ${v("CCCD")}</li>
      <li><strong>Số điện thoại:</strong> ${v("ĐIỆN THOẠI")}</li>
      <li><strong>Địa chỉ:</strong> ${v("ĐỊA CHỈ")}</li>
      <li><strong>Họ tên Tham chiếu 1:</strong> ${v("HỌ TÊN THAM CHIẾU 1")}</li>
      <li><strong>Họ tên Tham chiếu 2:</strong> ${v("HỌ TÊN THAM CHIẾU 2")}</li>
      <li><strong>Số tiền vay:</strong> ${formatVND(v("SỐ TIỀN VAY"))}</li>
      <li><strong>Tổng kỳ hạn trả góp:</strong> ${v("KỲ HẠN")}</li>
      <li><strong>Số tiền dư nợ gốc:</strong> ${formatVND(
        v("SỐ TIỀN DƯ NỢ GỐC")
      )}</li>
      <li><strong>SỐ TIỀN TRẢ GÓP THÁNG NÀY CẦN THANH TOÁN NGAY:</strong> ${formatVND(
        v("SỐ TIỀN CẦN THANH TOÁN NGAY")
      )}</li>
    </ul>

    <p>
      Khoản vay trả góp theo hợp đồng tín dụng của Quý khách tháng này hiện đã <strong>QUÁ HẠN THANH TOÁN</strong>. 
      Việc chậm thanh toán sẽ dẫn đến những hậu quả sau:
    </p>
    <ul>
      <li>Phát sinh phí phạt trả chậm và lãi phạt tăng lên từng ngày</li>
      <li>Bị ghi nhận vào lịch sử tín dụng xấu tại Trung tâm Thông tin tín dụng (CIC)</li>
      <li>Ảnh hưởng nghiêm trọng đến khả năng vay vốn, mở thẻ tín dụng và sử dụng dịch vụ tài chính trong tương lai</li>
      <li>Có thể bị áp dụng các biện pháp xử lý theo hợp đồng và quy định pháp luật hiện hành</li>
    </ul>

    <p><strong>👉 Kính đề nghị Quý khách thanh toán ngay lập tức để tránh phát sinh thêm rủi ro và chi phí không mong muốn.</strong></p>
    <p>
      Trên app hoặc cổng thanh toán BIDV hiện số tiền đã gộp 2 kỳ, Quý khách vui lòng chọn số khác nhập số tiền 1 kỳ cần thanh toán ngay ở trên và tiến hành thanh toán.
    </p>

    <div class="footer">
      <p>Nếu cần hỗ trợ thêm thông tin hoặc hướng dẫn thanh toán, vui lòng liên hệ:</p>
      <p>- Tổng đài CSKH: <strong>1900 6515</strong></p>
      <p>- Zalo CSKH hỗ trợ: <strong>Giai Vy – 0528 778 591</strong></p>
      <p>Trân trọng,<br/><strong>Trung tâm Dịch vụ Khách hàng – Vay Nhanh | Tin Vay</strong></p>
      <p><em>Trong trường hợp Quý khách đã thanh toán, vui lòng bỏ qua email này. Xin Cảm Ơn!</em></p>
    </div>
  </div>
</body>
</html>`;

    case 3:
      return `<!doctype html>
<html lang="vi">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>[TIN VAY - THÔNG BÁO VI PHẠM TÍN DỤNG]</title>
  ${style}
</head>
<body>
  <div class="card">
    <h1>⚠️⚠️[TIN VAY - THÔNG BÁO VI PHẠM TÍN DỤNG] HĐ VAY QUÁ HẠN THANH TOÁN KỲ THÁNG ${month} – Mã hợp đồng: ${v(
        "MÃ KHOẢN VAY"
      )}</h1>

    <p>Kính gửi Ông/Bà <strong>${v("HỌ VÀ TÊN")}</strong>,</p>
    <p>TIN VAY xin thông báo đến Quý khách về khoản vay <strong>QUÁ HẠN THANH TOÁN KỲ THÁNG ${month}</strong> như sau:</p>

    <ul>
      <li><strong>Mã hợp đồng:</strong> ${v("MÃ KHOẢN VAY")}</li>
      <li><strong>CCCD:</strong> ${v("CCCD")}</li>
      <li><strong>Số điện thoại:</strong> ${v("ĐIỆN THOẠI")}</li>
      <li><strong>Địa chỉ:</strong> ${v("ĐỊA CHỈ")}</li>
      <li><strong>Họ tên Tham chiếu 1:</strong> ${v("HỌ TÊN THAM CHIẾU 1")}</li>
      <li><strong>Họ tên Tham chiếu 2:</strong> ${v("HỌ TÊN THAM CHIẾU 2")}</li>
      <li><strong>Số tiền vay:</strong> ${formatVND(v("SỐ TIỀN VAY"))}</li>
      <li><strong>Tổng kỳ hạn trả góp:</strong> ${v("KỲ HẠN")}</li>
      <li><strong>Số tiền dư nợ gốc:</strong> ${formatVND(
        v("SỐ TIỀN DƯ NỢ GỐC")
      )}</li>
      <li><strong>SỐ TIỀN TRẢ GÓP THÁNG NÀY CẦN THANH TOÁN NGAY:</strong> ${formatVND(
        v("SỐ TIỀN CẦN THANH TOÁN NGAY")
      )}</li>
    </ul>

    <p>
      Chúng tôi ghi nhận tài khoản thanh toán theo hợp đồng bên Tin Vay của Ông/Bà đã chuyển sang hồ sơ 
      <strong>QUÁ HẠN</strong>. Nếu Ông/Bà không thực hiện thanh toán trước <strong>12h ngày hôm nay</strong>, 
      Ngân Hàng sẽ áp dụng các giải pháp xử lý bao gồm:
    </p>
    <ul>
      <li>Cộng 2 kỳ trả góp, khóa tài khoản, bắt buộc thanh toán 2 kỳ để tránh thời hạn sau</li>
      <li>Các tài khoản chậm thanh toán phát sinh phí theo quy định hợp nhất</li>
      <li>Tạm dừng hoặc dừng các dịch vụ hỗ trợ vay vốn tại Ngân Hàng</li>
      <li>Chuyển hồ sơ sang bộ phận thu nợ hoặc khởi động pháp lý</li>
      <li>Ghi nợ thông tin tại hệ thống CIC, ảnh hưởng nghiêm trọng đến lịch sử tín dụng</li>
    </ul>

    <p><strong>Chúng tôi rất mong Ông/Bà thanh toán khoản vay 1 kỳ cần thanh toán ngay lập tức để tránh những hậu quả pháp lý và tài chính không mong muốn.</strong></p>

    <div class="footer">
      <p>Nếu cần hỗ trợ thêm thông tin hoặc hướng dẫn thanh toán, vui lòng liên hệ:</p>
      <p>- Tổng đài CSKH: <strong>1900 6515</strong></p>
      <p>- Zalo CSKH hỗ trợ: <strong>Giai Vy – 0528 778 591</strong></p>
      <p>Trân trọng,<br/><strong>Phòng Xử Lý Hồ Sơ Vi Phạm Quá Hạn – Vay Nhanh | Tin Vay</strong></p>
      <p><em>Trong trường hợp Quý khách đã thanh toán, vui lòng bỏ qua email này. Xin Cảm Ơn!</em></p>
    </div>
  </div>
</body>
</html>`;

    case 4:
      return `<!doctype html>
<html lang="vi">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>[TIN VAY - HĐ QUÁ HẠN NGHIÊM TRỌNG]</title>
  ${style}
</head>
<body>
  <div class="card">
    <h1>⚠️⚠️⚠️[TIN VAY - THÔNG BÁO HĐ QUÁ HẠN NGHIÊM TRỌNG] HĐ VAY QUÁ HẠN NGHIÊM TRỌNG THANH TOÁN KỲ THÁNG ${month} – Mã hợp đồng: ${v(
        "MÃ KHOẢN VAY"
      )}</h1>

    <p>Kính gửi Ông/Bà <strong>${v("HỌ VÀ TÊN")}</strong>,</p>
    <p>TIN VAY xin thông báo đến Quý khách về khoản vay <strong>VI PHẠM QUÁ HẠN NGHIÊM TRỌNG</strong> thanh toán kỳ tháng ${month} như sau:</p>

    <ul>
      <li><strong>Mã hợp đồng:</strong> ${v("MÃ KHOẢN VAY")}</li>
      <li><strong>CCCD:</strong> ${v("CCCD")}</li>
      <li><strong>Số điện thoại:</strong> ${v("ĐIỆN THOẠI")}</li>
      <li><strong>Địa chỉ:</strong> ${v("ĐỊA CHỈ")}</li>
      <li><strong>Họ tên Tham chiếu 1:</strong> ${v("HỌ TÊN THAM CHIẾU 1")}</li>
      <li><strong>Họ tên Tham chiếu 2:</strong> ${v("HỌ TÊN THAM CHIẾU 2")}</li>
      <li><strong>Số tiền vay:</strong> ${formatVND(v("SỐ TIỀN VAY"))}</li>
      <li><strong>Tổng kỳ hạn trả góp:</strong> ${v("KỲ HẠN")}</li>
      <li><strong>Số tiền dư nợ gốc:</strong> ${formatVND(
        v("SỐ TIỀN DƯ NỢ GỐC")
      )}</li>
      <li><strong>SỐ TIỀN TRẢ GÓP THÁNG NÀY CẦN THANH TOÁN NGAY:</strong> ${formatVND(
        v("SỐ TIỀN CẦN THANH TOÁN NGAY")
      )}</li>
    </ul>

    <p>Hiện tại chúng tôi ghi nhận khoản thanh toán kỳ tháng ${month} của Quý khách vẫn chưa được hoàn tất. Hồ sơ của Quý khách đã được chuyển sang trạng thái <strong>VI PHẠM QUÁ HẠN NGHIÊM TRỌNG</strong> và đang được xác minh trên CIC về khả năng thanh toán theo cam kết hợp đồng vay. Do việc chậm trễ và không phản hồi các thông báo trước đây, kỳ hạn trả góp hiện tại đã bị cộng gộp thành <strong>02 kỳ</strong> trên các ứng dụng thanh toán (Viettel Money, VCcard, MoMo) bắt buộc thanh toán.</p>

    <p><strong>Yêu cầu Quý khách khẩn trương xử lý thanh toán ngay tối thiểu 1 kỳ trả góp (số tiền cần thanh toán ở trên) trong hôm nay.</strong> Nếu không, hồ sơ sẽ bị chuyển tiếp sang nhóm <strong>NỢ CHÚ Ý / NỢ XẤU</strong>, ảnh hưởng nghiêm trọng đến lịch sử tín dụng và khả năng vay vốn trong tương lai.</p>

    <div class="footer">
      <p>Nếu cần hỗ trợ thêm thông tin hoặc hướng dẫn thanh toán, vui lòng liên hệ:</p>
      <p>- Tổng đài CSKH: <strong>1900 6515</strong></p>
      <p>- Zalo CSKH hỗ trợ: <strong>Giai Vy – 0528 778 591</strong></p>
      <p>Trân trọng,<br/><strong>Phòng Xử Lý Hồ Sơ Vi Phạm Quá Hạn – Vay Nhanh | Tin Vay</strong></p>
      <p><em>Trong trường hợp Quý khách đã thanh toán, vui lòng bỏ qua email này. Xin Cảm Ơn!</em></p>
    </div>
  </div>
</body>
</html>`;

    // =======================
    // CASE 5: XỬ LÝ GẤP - QUÁ HẠN NGHIÊM TRỌNG
    // =======================
    case 5:
      return `<!doctype html>
<html lang="vi">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>[TIN VAY - XỬ LÝ GẤP HĐ QUÁ HẠN NGHIÊM TRỌNG]</title>
  ${style}
</head>
<body>
  <div class="card">
    <h1>⚠️⚠️⚠️[TIN VAY - THÔNG BÁO XỬ LÝ GẤP - HĐ QUÁ HẠN NGHIÊM TRỌNG] HĐ VAY VI PHẠM QUÁ HẠN NGHIÊM TRỌNG THANH TOÁN KỲ THÁNG ${month} – Mã hợp đồng: ${v(
        "MÃ KHOẢN VAY"
      )}</h1>

    <p>Kính gửi Ông/Bà <strong>${v("HỌ VÀ TÊN")}</strong>,</p>
    <p>TIN VAY xin thông báo đến Quý khách về khoản vay <strong>VI PHẠM QUÁ HẠN NGHIÊM TRỌNG</strong> cần <strong>XỬ LÝ THANH TOÁN NGAY</strong> kỳ tháng ${month} như sau:</p>

    <ul>
      <li><strong>Mã hợp đồng:</strong> ${v("MÃ KHOẢN VAY")}</li>
      <li><strong>CCCD:</strong> ${v("CCCD")}</li>
      <li><strong>Số điện thoại:</strong> ${v("ĐIỆN THOẠI")}</li>
      <li><strong>Địa chỉ:</strong> ${v("ĐỊA CHỈ")}</li>
      <li><strong>Họ tên Tham chiếu 1:</strong> ${v("HỌ TÊN THAM CHIẾU 1")}</li>
      <li><strong>Họ tên Tham chiếu 2:</strong> ${v("HỌ TÊN THAM CHIẾU 2")}</li>
      <li><strong>Số tiền vay:</strong> ${formatVND(v("SỐ TIỀN VAY"))}</li>
      <li><strong>Tổng kỳ hạn trả góp:</strong> ${v("KỲ HẠN")}</li>
      <li><strong>Số tiền dư nợ gốc:</strong> ${formatVND(
        v("SỐ TIỀN DƯ NỢ GỐC")
      )}</li>
      <li><strong>SỐ TIỀN TRẢ GÓP THÁNG NÀY CẦN THANH TOÁN NGAY:</strong> ${formatVND(
        v("SỐ TIỀN CẦN THANH TOÁN NGAY")
      )}</li>
    </ul>

    <p><em>"Đến nay, TIN VAY vẫn chưa nhận được khoản thanh toán kỳ tháng ${month} của Quý khách. Việc chậm thanh toán đã gây ảnh hưởng nghiêm trọng đến hợp đồng vay và lịch sử tín dụng của Quý khách. Chúng tôi đã nhiều lần liên hệ nhưng chưa nhận được phản hồi. Nếu Quý khách tiếp tục không thực hiện thanh toán hoặc không liên hệ với chúng tôi trong vòng 02 ngày kể từ khi nhận được email này, Ngân Hàng sẽ áp dụng các biện pháp theo hợp đồng và quy định pháp luật, bao gồm chuyển hồ sơ sang phòng THU HỒI NỢ chuyên trách hoặc KHỞI KIỆN."</em></p>

    <p><strong>Chúng tôi mong Quý khách liên hệ và thực hiện nghĩa vụ thanh toán ngay tối thiểu 1 kỳ (số tiền cần thanh toán ở trên) để tránh những hậu quả không mong muốn.</strong></p>

    <div class="footer">
      <p>Nếu cần hỗ trợ thêm thông tin hoặc hướng dẫn thanh toán, vui lòng liên hệ:</p>
      <p>- Tổng đài CSKH: <strong>1900 6515</strong></p>
      <p>- Zalo CSKH hỗ trợ: <strong>Giai Vy – 0528 778 591</strong></p>
      <p>Trân trọng,<br/><strong>Phòng Xử Lý Hồ Sơ Vi Phạm Quá Hạn – Vay Nhanh | Tin Vay</strong></p>
      <p><em>Trong trường hợp Quý khách đã thanh toán, vui lòng bỏ qua email này. Xin Cảm Ơn!</em></p>
    </div>
  </div>
</body>
</html>`;

    // =======================
    // CASE 6: VI PHẠM HỢP ĐỒNG TÍN DỤNG – XỬ LÝ THEO PHÁP LUẬT
    // =======================
    case 6:
      return `<!doctype html>
<html lang="vi">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>[TIN VAY - VI PHẠM HỢP ĐỒNG TÍN DỤNG]</title>
  ${style}
</head>
<body>
  <div class="card">
    <h1>⚠️ TIN VAY THÔNG BÁO : VI PHẠM HỢP ĐỒNG TÍN DỤNG – XỬ LÝ THEO QUY ĐỊNH PHÁP LUẬT</h1>

    <p>Kính gửi Ông/Bà <strong>${v("HỌ VÀ TÊN")}</strong>,</p>
    <p>TIN VAY gửi thư này để thông báo rằng hợp đồng tín dụng TIN VAY của Quý khách tại VietCredit đã quá hạn thanh toán nghiêm trọng, và đến nay không ghi nhận bất kỳ khoản thanh toán hay phản hồi nào từ phía Quý khách.</p>

    <ul>
      <li><strong>Mã hợp đồng:</strong> ${v("MÃ KHOẢN VAY")}</li>
      <li><strong>CCCD:</strong> ${v("CCCD")}</li>
      <li><strong>Số điện thoại:</strong> ${v("ĐIỆN THOẠI")}</li>
      <li><strong>Địa chỉ:</strong> ${v("ĐỊA CHỈ")}</li>
      <li><strong>Họ tên Tham chiếu 1:</strong> ${v("HỌ TÊN THAM CHIẾU 1")}</li>
      <li><strong>Họ tên Tham chiếu 2:</strong> ${v("HỌ TÊN THAM CHIẾU 2")}</li>
      <li><strong>Số tiền vay:</strong> ${formatVND(v("SỐ TIỀN VAY"))}</li>
      <li><strong>Tổng kỳ hạn trả góp:</strong> ${v("KỲ HẠN")}</li>
      <li><strong>Số tiền dư nợ gốc:</strong> ${formatVND(
        v("SỐ TIỀN DƯ NỢ GỐC")
      )}</li>
      <li><strong>SỐ TIỀN TRẢ GÓP THÁNG NÀY CẦN THANH TOÁN NGAY:</strong> ${formatVND(
        v("SỐ TIỀN CẦN THANH TOÁN NGAY")
      )}</li>
    </ul>

    <p>⛔ Hành vi chậm thanh toán này đã vi phạm nghiêm trọng: Điều khoản cam kết trong hợp đồng tín dụng đã ký giữa hai bên; Bộ luật Dân sự 2015 – Điều 466: Nghĩa vụ trả nợ; Luật Các tổ chức tín dụng 2010 (sửa đổi, bổ sung năm 2017); Bộ luật Hình sự 2015 – Điều 175: Tội lạm dụng tín nhiệm chiếm đoạt tài sản.</p>

    <p><em>"📌 Chúng tôi thông báo rõ: Đây là THÔNG BÁO NHẮC NỢ CUỐI CÙNG trước khi chúng tôi tiến hành:
    Tất toán hợp đồng tín dụng, tính lãi/phạt theo đúng quy định;
    Chuyển hồ sơ sang bộ phận xử lý cưỡng chế, liên hệ trực tiếp tại nơi cư trú/làm việc;
    Báo cáo nợ xấu vĩnh viễn lên CIC – ảnh hưởng nghiêm trọng đến lịch sử tín dụng trong ít nhất 5 năm;
    Từ chối cấp tín dụng, thẻ tín dụng tại VietCredit và các ngân hàng/tổ chức tài chính khác;
    Chuyển hồ sơ đến cơ quan có thẩm quyền để xử lý theo hướng truy cứu trách nhiệm dân sự hoặc hình sự nếu xác định có dấu hiệu chiếm đoạt tài sản."</em></p>

    <p><strong>⚠️ Thời hạn cuối cùng để xử lý thanh toán tối thiểu 1 kỳ góp (số tiền cần thanh toán ở trên) là trước 16h hôm nay.</strong> Đề nghị Quý khách thanh toán ngay hoặc chủ động liên hệ để thỏa thuận phương án phù hợp. Mọi sự im lặng hoặc chậm trễ sau thời điểm này sẽ được xem là từ chối hợp tác và chấp nhận mọi hậu quả pháp lý phát sinh.</p>

    <div class="footer">
      <p>Nếu cần hỗ trợ thêm thông tin hoặc hướng dẫn thanh toán, vui lòng liên hệ:</p>
      <p>- Tổng đài CSKH: <strong>1900 6515</strong></p>
      <p>- Zalo CSKH hỗ trợ: <strong>Giai Vy – 0528 778 591</strong></p>
      <p>VietCredit trân trọng thông báo và yêu cầu sự hợp tác khẩn cấp từ Quý khách.</p>
      <p>Trân trọng,<br/><strong>Bộ phận Thu hồi Nợ</strong></p>
    </div>
  </div>
</body>
</html>`;

    // =======================
    // CASE 7: THÔNG BÁO NỢ CHÚ Ý – TẤT TOÁN & TRUY THU TẠI ĐỊA BÀN
    // =======================
    case 7:
      return `<!doctype html>
<html lang="vi">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>[TIN VAY - THÔNG BÁO NỢ CHÚ Ý: TẤT TOÁN & TRUY THU]</title>
  ${style}
</head>
<body>
  <div class="card">
    <h1>⚠️ THÔNG BÁO NỢ CHÚ Ý TIN VAY: TẤT TOÁN KHOẢN VAY QUÁ HẠN & TRIỂN KHAI TRUY THU TẠI ĐỊA BÀN</h1>

    <p>Kính gửi Ông/Bà <strong>${v("HỌ VÀ TÊN")}</strong></p>

    <ul>
      <li><strong>Mã hợp đồng:</strong> ${v("MÃ KHOẢN VAY")}</li>
      <li><strong>CCCD:</strong> ${v("CCCD")}</li>
      <li><strong>Số điện thoại:</strong> ${v("ĐIỆN THOẠI")}</li>
      <li><strong>Địa chỉ:</strong> ${v("ĐỊA CHỈ")}</li>
      <li><strong>Họ tên Tham chiếu 1:</strong> ${v("HỌ TÊN THAM CHIẾU 1")}</li>
      <li><strong>Họ tên Tham chiếu 2:</strong> ${v("HỌ TÊN THAM CHIẾU 2")}</li>
      <li><strong>Số tiền vay:</strong> ${formatVND(v("SỐ TIỀN VAY"))}</li>
      <li><strong>Tổng kỳ hạn trả góp:</strong> ${v("KỲ HẠN")}</li>
      <li><strong>Số tiền dư nợ gốc:</strong> ${formatVND(
        v("SỐ TIỀN DƯ NỢ GỐC")
      )}</li>
      <li><strong>SỐ TIỀN TRẢ GÓP THÁNG NÀY CẦN THANH TOÁN NGAY:</strong> ${formatVND(
        v("SỐ TIỀN CẦN THANH TOÁN NGAY")
      )}</li>
    </ul>

    <p><em>"Theo hệ thống quản lý và hợp đồng tín dụng đã ký với VietCredit – CTCP Tín Việt, Quý khách hiện đang có tài khoản vay quá hạn mức nghiêm trọng, với số tiền còn nợ chưa thanh toán.
    Mặc dù đã nhiều lần được nhắc nhở qua điện thoại, tin nhắn, email và Zalo, Quý khách vẫn chưa thực hiện nhiệm vụ thanh toán và không có phản hồi hợp tác.
    Chúng tôi xin thông báo:
    Từ hôm nay, toàn bộ tài khoản vay sẽ bị <strong>TẤT TOÁN CƯỠNG CHẾ</strong>, bao gồm toàn bộ tiền gốc, lãi, phí khóa hạn và chi phí thu hồi nợ phát sinh.
    Hồ sơ sẽ được chuyển sang bộ phận thu hồi nợ trực tiếp để truy thu tận nơi tại địa bàn cư trú hoặc nơi làm việc, có thể phối hợp với chính quyền địa phương.
    Quý khách sẽ được ghi nhận nợ xấu mức độ nghiêm trọng nhất tại Trung tâm Tín dụng Quốc gia (CIC), gây ảnh hưởng nghiêm trọng đến khả năng vay vốn, mua trả góp và giao dịch tài chính trong ít nhất 5 năm tới.
    VietCredit sẽ tiến hành khởi động thủ tục tố tụng và yêu cầu cơ quan thi hành án dân sự nếu Quý khách tiếp tục trốn tránh nghĩa vụ trả nợ.
    Thông tin nợ xấu và vi phạm nghĩa vụ tài chính sẽ được công khai nội bộ trong cộng đồng tài chính và gửi đến các đối tác tín dụng để ngăn chặn mọi hình thức vay vốn, giao dịch.
    Đây là <strong>thông báo CUỐI CÙNG</strong>.
    Quý khách chỉ còn thời hạn đến <strong>16h00 hôm nay</strong> để thanh toán toàn bộ khoản nợ hoặc thực hiện thanh toán tối thiểu 1 kỳ trả góp của mình. Sau thời hạn trên, VietCredit sẽ tiến hành toàn bộ các biện pháp cưỡng chế mà không cần thêm bất kỳ thông báo nào."</em></p>

    <div class="footer">
      <p>Nếu cần hỗ trợ thêm thông tin hoặc hướng dẫn thanh toán, vui lòng liên hệ:</p>
      <p>- Tổng đài CSKH: <strong>1900 6515</strong></p>
      <p>- Zalo CSKH hỗ trợ: <strong>Giai Vy – 0528 778 591</strong></p>
      <p>Trân trọng,<br/><strong>Bộ phận Thu hồi Nợ TIN VAY</strong></p>
    </div>
  </div>
</body>
</html>`;

    // =======================
    // CASE 8: CẢNH BÁO CUỐI CÙNG XỬ LÝ THANH TOÁN NỢ XẤU
    // =======================
    case 8:
      return `<!doctype html>
<html lang="vi">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>[TIN VAY - CẢNH BÁO CUỐI CÙNG XỬ LÝ NỢ XẤU]</title>
 ${style}
</head>
<body>
  <div class="card">
    <h1>⚠️ TIN VAY - CẢNH BÁO CUỐI CÙNG XỬ LÝ THANH TOÁN NỢ XẤU ⚠️</h1>

    <p>Kính gửi Ông/Bà <strong>${v("HỌ VÀ TÊN")}</strong></p>

    <ul>
      <li><strong>Mã hợp đồng:</strong> ${v("MÃ KHOẢN VAY")}</li>
      <li><strong>CCCD:</strong> ${v("CCCD")}</li>
      <li><strong>Số điện thoại:</strong> ${v("ĐIỆN THOẠI")}</li>
      <li><strong>Địa chỉ:</strong> ${v("ĐỊA CHỈ")}</li>
      <li><strong>Họ tên Tham chiếu 1:</strong> ${v("HỌ TÊN THAM CHIẾU 1")}</li>
      <li><strong>Họ tên Tham chiếu 2:</strong> ${v("HỌ TÊN THAM CHIẾU 2")}</li>
      <li><strong>Số tiền vay:</strong> ${formatVND(v("SỐ TIỀN VAY"))}</li>
      <li><strong>Tổng kỳ hạn trả góp:</strong> ${v("KỲ HẠN")}</li>
      <li><strong>Số tiền dư nợ gốc:</strong> ${formatVND(
        v("SỐ TIỀN DƯ NỢ GỐC")
      )}</li>
      <li><strong>SỐ TIỀN TRẢ GÓP THÁNG NÀY CẦN THANH TOÁN NGAY:</strong> ${formatVND(
        v("SỐ TIỀN CẦN THANH TOÁN NGAY")
      )}</li>
    </ul>

    <p><em>"Hợp đồng tín dụng số TIN VAY của Ông/Bà tại VietCredit đã <strong>QUÁ HẠN</strong> nhiều ngày và đến nay, TIN VAY không nhận được bất kỳ khoản thanh toán hoặc phản hồi hợp tác nào.
    Đây là <strong>cảnh báo cuối cùng</strong> trước khi tiến hành các biện pháp cưỡng chế thu hồi nợ theo đúng quy trình và pháp luật:
    Hồ sơ của Ông/Bà sẽ được chuyển ngay sang bộ phận thu hồi nợ trực tiếp, có quyền liên hệ tại địa bàn cư trú hoặc nơi làm việc.
    TIN VAY sẽ thực hiện các biện pháp cưỡng chế tài sản theo quy định (nếu có cơ sở và thẩm quyền), phối hợp cơ quan chức năng để thu hồi toàn bộ nợ gốc, lãi, phí phạt và chi phí phát sinh.
    Thông tin nợ xấu sẽ được ghi nhận vĩnh viễn trên CIC, ảnh hưởng nghiêm trọng đến lịch sử tín dụng trong ít nhất 5 năm.
    VietCredit có quyền từ chối hợp tác, cấp tín dụng mới hoặc mở thẻ tín dụng trong tương lai.
    Ông/Bà chỉ còn thời hạn đến <strong>15h00 hôm nay</strong> để thanh toán toàn bộ khoản vay hoặc liên hệ ngay với chúng tôi để thương lượng giải pháp."</em></p>

    <p><strong>Mọi sự im lặng hay không hợp tác sẽ được hiểu là chấp nhận hoàn toàn mọi hậu quả pháp lý và tài chính do vi phạm hợp đồng tín dụng gây ra.</strong></p>

    <div class="footer">
      <p>Nếu cần hỗ trợ thêm thông tin hoặc hướng dẫn thanh toán, vui lòng liên hệ:</p>
      <p>- Tổng đài CSKH: <strong>1900 6515</strong></p>
      <p>- Zalo CSKH hỗ trợ: <strong>Giai Vy – 0528 778 591</strong></p>
      <p>TIN VAY trân trọng thông báo và mong nhận được sự hợp tác kịp thời của Anh/Chị.<br/><strong>Bộ phận Thu hồi Nợ TIN VAY</strong></p>
    </div>
  </div>
</body>
</html>`;

    // =======================
    // CASE 9: VI PHẠM HỢP ĐỒNG TÍN DỤNG – XỬ LÝ THEO QUY ĐỊNH PHÁP LUẬT (BIẾN THỂ)
    // =======================
    case 9:
      return `<!doctype html>
<html lang="vi">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>[TIN VAY - VI PHẠM HỢP ĐỒNG TÍN DỤNG]</title>
  ${style}
</head>
<body>
  <div class="card">
    <h1>⚠️TIN VAY THÔNG BÁO : VI PHẠM HỢP ĐỒNG TÍN DỤNG – XỬ LÝ THEO QUY ĐỊNH PHÁP LUẬT⚠️</h1>

    <p>Kính gửi Ông/Bà <strong>${v("HỌ VÀ TÊN")}</strong></p>

    <ul>
      <li><strong>Mã hợp đồng:</strong> ${v("MÃ KHOẢN VAY")}</li>
      <li><strong>CCCD:</strong> ${v("CCCD")}</li>
      <li><strong>Số điện thoại:</strong> ${v("ĐIỆN THOẠI")}</li>
      <li><strong>Địa chỉ:</strong> ${v("ĐỊA CHỈ")}</li>
      <li><strong>Họ tên Tham chiếu 1:</strong> ${v("HỌ TÊN THAM CHIẾU 1")}</li>
      <li><strong>Họ tên Tham chiếu 2:</strong> ${v("HỌ TÊN THAM CHIẾU 2")}</li>
      <li><strong>Số tiền vay:</strong> ${formatVND(v("SỐ TIỀN VAY"))}</li>
      <li><strong>Tổng kỳ hạn trả góp:</strong> ${v("KỲ HẠN")}</li>
      <li><strong>Số tiền dư nợ gốc:</strong> ${formatVND(
        v("SỐ TIỀN DƯ NỢ GỐC")
      )}</li>
      <li><strong>SỐ TIỀN TRẢ GÓP THÁNG NÀY CẦN THANH TOÁN NGAY:</strong> ${formatVND(
        v("SỐ TIỀN CẦN THANH TOÁN NGAY")
      )}</li>
    </ul>

    <p><em>"Chúng tôi gửi thư này để thông báo rằng hợp đồng tín dụng TIN VAY của Quý Khách tại VietCredit đã quá hạn thanh toán nghiêm trọng và đến nay không ghi nhận bất kỳ khoản thanh toán hay phản hồi nào từ phía Quý Khách.</em></p>

    <p>⛔ Hành vi chậm thanh toán này đã vi phạm nghiêm trọng:
    <br/>- Điều khoản cam kết trong hợp đồng tín dụng đã ký giữa hai bên
    <br/>- Bộ luật Dân sự 2015 – Điều 466: Nghĩa vụ trả nợ
    <br/>- Luật Các tổ chức tín dụng 2010 (sửa đổi, bổ sung năm 2017)
    <br/>- Bộ luật Hình sự 2015 – Điều 175: Tội lạm dụng tín nhiệm chiếm đoạt tài sản</p>

    <p><strong>📌 VietCredit thông báo rõ:</strong><br/>
    Đây là <strong>THÔNG BÁO NHẮC NỢ CUỐI CÙNG</strong> trước khi chúng tôi tiến hành:
    <br/>- Tất toán hợp đồng tín dụng, tính lãi/phạt theo đúng quy định
    <br/>- Chuyển hồ sơ sang bộ phận xử lý cưỡng chế, liên hệ trực tiếp tại nơi cư trú/làm việc
    <br/>- Báo cáo nợ xấu vĩnh viễn lên CIC – ảnh hưởng nghiêm trọng đến lịch sử tín dụng trong ít nhất 5 năm
    <br/>- Từ chối cấp tín dụng, thẻ tín dụng tại VietCredit và các ngân hàng/tổ chức tài chính khác
    <br/>- Chuyển hồ sơ đến cơ quan có thẩm quyền để xử lý theo hướng truy cứu trách nhiệm dân sự hoặc hình sự nếu xác định có dấu hiệu chiếm đoạt tài sản</p>

    <p><strong>⚠️ Thời hạn cuối cùng</strong> để xử lý thanh toán tối thiểu 1 kỳ góp tháng này là <strong>trước 20h hôm nay</strong>. Đề nghị Quý Khách thanh toán ngay 1 kỳ hoặc chủ động liên hệ để thỏa thuận phương án phù hợp. Mọi sự im lặng/chậm trễ sẽ được xem là từ chối hợp tác và chấp nhận mọi hậu quả pháp lý phát sinh.</p>

    <div class="footer">
      <p>Nếu cần hỗ trợ thêm thông tin hoặc hướng dẫn thanh toán, vui lòng liên hệ:</p>
      <p>- Tổng đài CSKH: <strong>1900 6515</strong></p>
      <p>- Zalo CSKH hỗ trợ: <strong>Giai Vy – 0528 778 591</strong></p>
      <p>VietCredit trân trọng thông báo và yêu cầu sự hợp tác khẩn cấp từ Quý Khách.<br/><strong>Bộ phận Thu hồi Nợ TIN VAY</strong></p>
    </div>
  </div>
</body>
</html>`;

    // =======================
    // CASE 10: CẢNH BÁO PHÁP LÝ – NGUY CƠ TRUY CỨU HÌNH SỰ
    // =======================
    case 10:
      return `<!doctype html>
<html lang="vi">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>[TIN VAY CẢNH BÁO PHÁP LÝ] Không thanh toán khoản vay – nguy cơ truy cứu trách nhiệm hình sự</title>
  ${style}
</head>
<body>
  <div class="card">
    <h1>⚠️ [TIN VAY CẢNH BÁO PHÁP LÝ] ⚠️ Không thanh toán khoản vay – nguy cơ truy cứu trách nhiệm hình sự</h1>

    <p>Kính gửi Ông/Bà <strong>${v("HỌ VÀ TÊN")}</strong></p>

    <ul>
      <li><strong>Mã hợp đồng:</strong> ${v("MÃ KHOẢN VAY")}</li>
      <li><strong>CCCD:</strong> ${v("CCCD")}</li>
      <li><strong>Số điện thoại:</strong> ${v("ĐIỆN THOẠI")}</li>
      <li><strong>Địa chỉ:</strong> ${v("ĐỊA CHỈ")}</li>
      <li><strong>Họ Tên Tham Chiếu 1:</strong> ${v("HỌ TÊN THAM CHIẾU 1")}</li>
      <li><strong>Họ Tên Tham Chiếu 2:</strong> ${v("HỌ TÊN THAM CHIẾU 2")}</li>
      <li><strong>Số Tiền Vay:</strong> ${formatVND(v("SỐ TIỀN VAY"))}</li>
      <li><strong>Tổng kỳ hạn trả góp:</strong> ${v("KỲ HẠN")}</li>
      <li><strong>Số Tiền Dư Nợ gốc:</strong> ${formatVND(
        v("SỐ TIỀN DƯ NỢ GỐC")
      )}</li>
      <li><strong>SỐ TIỀN TRẢ GÓP THÁNG NÀY CẦN THANH TOÁN NGAY:</strong> ${formatVND(
        v("SỐ TIỀN CẦN THANH TOÁN NGAY")
      )}</li>
    </ul>

    <p><em>"Căn cứ theo hợp đồng tín dụng đã ký kết giữa Quý Khách và Công ty Tài chính Cổ phần Tín Việt (VietCredit), chúng tôi gửi đến Quý Khách Thông báo nhắc nợ lần cuối, với các nội dung quan trọng như sau:</em></p>
    <p><strong>🔺 Tình trạng hiện tại:</strong><br/>Khoản vay của Quý Khách hiện đang quá hạn thanh toán nghiêm trọng, và đến thời điểm phát hành thông báo này, chúng tôi chưa ghi nhận bất kỳ khoản thanh toán hoặc phản hồi hợp tác nào từ phía Quý Khách.</p>
    <p><strong>🔺 Căn cứ pháp lý liên quan:</strong><br/>Bộ luật Dân sự 2015 – Điều 466: Nghĩa vụ trả nợ<br/>Luật Các tổ chức tín dụng 2010 (sửa đổi, bổ sung 2017)<br/>Bộ luật Hình sự 2015 – Điều 175: Tội lạm dụng tín nhiệm chiếm đoạt tài sản</p>
    <p><strong>🔺 Các biện pháp sẽ được áp dụng nếu Quý Khách không hợp tác:</strong><br/>Tất toán toàn bộ khoản vay, tính thêm lãi/phí phạt theo hợp đồng;<br/>Chuyển hồ sơ sang bộ phận cưỡng chế, liên hệ trực tiếp tại nơi cư trú/làm việc;<br/>Báo cáo nợ xấu vĩnh viễn lên Trung tâm Thông tin Tín dụng Quốc gia (CIC) – ảnh hưởng nghiêm trọng đến lịch sử tín dụng trong ít nhất 05 năm;<br/>Từ chối cấp tín dụng, thẻ tín dụng tại VietCredit và các tổ chức tài chính khác;<br/>Chuyển hồ sơ đến cơ quan có thẩm quyền để xử lý theo hướng truy cứu trách nhiệm dân sự hoặc hình sự nếu xác định có dấu hiệu chiếm đoạt tài sản.</p>

    <p><strong>⏰ Thời hạn cuối: Trước 15h00 ngày hôm nay</strong></p>
    <p>Chúng tôi yêu cầu Quý Khách: Thanh toán tối thiểu 01 kỳ góp tháng này ngay lập tức <em>hoặc</em> chủ động liên hệ để thỏa thuận phương án thanh toán phù hợp.</p>
    <p><strong>⚠️ Lưu ý:</strong> Mọi sự im lặng, né tránh hoặc không phản hồi sau thời điểm trên sẽ được xem là hành vi từ chối hợp tác, và VietCredit sẽ thực hiện toàn bộ các biện pháp pháp lý cần thiết mà không cần thêm bất kỳ thông báo nào khác.</p>

    <div class="footer">
      <p>Nếu cần hỗ trợ thêm thông tin hoặc hướng dẫn thanh toán, vui lòng liên hệ:</p>
      <p>- Tổng đài CSKH: <strong>1900 6515</strong></p>
      <p>- Zalo CSKH hỗ trợ: <strong>Giai Vy – 0528 778 591</strong></p>
      <p>VietCredit trân trọng thông báo và đề nghị Quý Khách nghiêm túc xử lý khoản nợ để tránh các hậu quả pháp lý không thể đảo ngược.<br/><strong>Bộ phận Thu hồi Nợ</strong></p>
    </div>
  </div>
</body>
</html>`;

    // =======================
    // CASE 11: THÔNG BÁO KHẨN – TRƯỚC KHI CHUYỂN HỒ SƠ SANG CƠ QUAN ĐIỀU TRA
    // =======================
    case 11:
      return `<!doctype html>
<html lang="vi">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>[TIN VAY - THÔNG BÁO KHẨN – ĐỀ NGHỊ THANH TOÁN TRƯỚC KHI CHUYỂN HỒ SƠ ĐIỀU TRA]</title>
  ${style}
</head>
<body>
  <div class="card">
    <h1>🚨 [TIN VAY - THÔNG BÁO KHẨN – ĐỀ NGHỊ THANH TOÁN TRƯỚC KHI CHUYỂN HỒ SƠ SANG CƠ QUAN ĐIỀU TRA] 🚨</h1>

    <p>Kính gửi Ông/Bà <strong>${v("HỌ VÀ TÊN")}</strong></p>

    <ul>
      <li><strong>Mã hợp đồng:</strong> ${v("MÃ KHOẢN VAY")}</li>
      <li><strong>CCCD:</strong> ${v("CCCD")}</li>
      <li><strong>Số điện thoại:</strong> ${v("ĐIỆN THOẠI")}</li>
      <li><strong>Địa chỉ:</strong> ${v("ĐỊA CHỈ")}</li>
      <li><strong>Họ Tên Tham Chiếu 1:</strong> ${v("HỌ TÊN THAM CHIẾU 1")}</li>
      <li><strong>Họ Tên Tham Chiếu 2:</strong> ${v("HỌ TÊN THAM CHIẾU 2")}</li>
      <li><strong>Số Tiền Vay:</strong> ${formatVND(v("SỐ TIỀN VAY"))}</li>
      <li><strong>Tổng kỳ hạn trả góp:</strong> ${v("KỲ HẠN")}</li>
      <li><strong>Số Tiền Dư Nợ gốc:</strong> ${formatVND(
        v("SỐ TIỀN DƯ NỢ GỐC")
      )}</li>
      <li><strong>SỐ TIỀN TRẢ GÓP THÁNG NÀY CẦN THANH TOÁN NGAY:</strong> ${formatVND(
        v("SỐ TIỀN CẦN THANH TOÁN NGAY")
      )}</li>
    </ul>

    <p><em>"Sau nhiều lần thông báo nhắc nợ, tạo điều kiện gia hạn và đề nghị hợp tác thiện chí, chúng tôi nhận thấy Quý Khách hoàn toàn im lặng và không thực hiện bất kỳ nghĩa vụ thanh toán nào đối với khoản vay đã ký với TIN VAY - Công ty Tài chính Cổ phần Tín Việt (VietCredit).</em></p>
    <p><strong>⚠️ CHÚNG TÔI CẢNH BÁO NGHIÊM TRỌNG:</strong> Tình trạng hiện tại thể hiện hành vi cố tình chiếm dụng tài sản trái phép, vi phạm quy định pháp luật hiện hành. Vì vậy, chúng tôi chính thức triển khai toàn bộ quy trình xử lý pháp lý và cưỡng chế, bao gồm:</p>

    <p><strong>🔻 HÀNH ĐỘNG ĐANG THỰC HIỆN:</strong><br/><u>CHUYỂN HỒ SƠ</u> sang Phòng Cưỡng chế Thu hồi Nợ → Truy thu trực tiếp tại nơi cư trú/làm việc.<br/><u>CHUYỂN CƠ QUAN CẢNH SÁT ĐIỀU TRA</u> → Đề nghị khởi tố theo Điều 175 – Bộ luật Hình sự 2015 (Tội lạm dụng tín nhiệm chiếm đoạt tài sản) – <em>Khung hình phạt: đến 3 năm tù giam</em>.<br/><u>BÁO CÁO NỢ XẤU VĨNH VIỄN LÊN CIC</u> – Hậu quả: Mất khả năng vay vốn, mua nhà/xe, từ chối mở thẻ tại hệ thống ngân hàng, ảnh hưởng xét duyệt cá nhân.</p>

    <p><strong>⏰ THỜI HẠN CUỐI CÙNG:</strong> Trước 21h00 ngày hôm nay. Yêu cầu Quý Khách <strong>thanh toán tối thiểu 01 kỳ góp còn nợ ngay lập tức</strong> qua các cổng thanh toán (BIDV, Viettel Money, v.v. – chọn “Số khác” để nhập số tiền kỳ tháng này) <em>hoặc</em> liên hệ để ký lại phương án trả nợ theo lộ trình.</p>

    <p><strong>❗ MỌI IM LẶNG TỪ THỜI ĐIỂM NÀY ĐƯỢC HIỂU LÀ TỪ CHỐI HỢP TÁC.</strong> Quy trình xử lý cưỡng chế & pháp lý sẽ được triển khai ngay, không cần thêm sự đồng ý từ phía Quý Khách.</p>

    <div class="footer">
      <p>Nếu cần hỗ trợ thêm thông tin hoặc hướng dẫn thanh toán, vui lòng liên hệ:</p>
      <p>- Tổng đài CSKH: <strong>1900 6515</strong></p>
      <p>- Zalo CSKH hỗ trợ: <strong>Giai Vy – 0528 778 591</strong></p>
      <p><strong>Phòng Xử Lý Nợ Xấu Tin Vay</strong></p>
    </div>
  </div>
</body>
</html>`;

    // =======================
    // CASE 12: KHẨN CẤP – HỢP TÁC TRƯỚC KHI CHUYỂN BƯỚC PHÁP LÝ
    // =======================
    case 12:
      return `<!doctype html>
<html lang="vi">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>[KHẨN CẤP THANH TOÁN NỢ TRƯỚC KHI CƠ CẤU HỒ SƠ LẠI]</title>
  ${style}
</head>
<body>
  <div class="card">
    <h1>[KHẨN CẤP THANH TOÁN NỢ TRƯỚC KHI CƠ CẤU HỒ SƠ LẠI] – Đề nghị hợp tác trước khi chuyển bước Pháp Lý</h1>

    <p>Kính gửi Ông/Bà <strong>${v("HỌ VÀ TÊN")}</strong></p>

    <ul>
      <li><strong>Mã hợp đồng:</strong> ${v("MÃ KHOẢN VAY")}</li>
      <li><strong>CCCD:</strong> ${v("CCCD")}</li>
      <li><strong>Số điện thoại:</strong> ${v("ĐIỆN THOẠI")}</li>
      <li><strong>Địa chỉ:</strong> ${v("ĐỊA CHỈ")}</li>
      <li><strong>Họ Tên Tham Chiếu 1:</strong> ${v("HỌ TÊN THAM CHIẾU 1")}</li>
      <li><strong>Họ Tên Tham Chiếu 2:</strong> ${v("HỌ TÊN THAM CHIẾU 2")}</li>
      <li><strong>Số Tiền Vay:</strong> ${formatVND(v("SỐ TIỀN VAY"))}</li>
      <li><strong>Tổng kỳ hạn trả góp:</strong> ${v("KỲ HẠN")}</li>
      <li><strong>Số Tiền Dư Nợ gốc:</strong> ${formatVND(
        v("SỐ TIỀN DƯ NỢ GỐC")
      )}</li>
      <li><strong>SỐ TIỀN TRẢ GÓP THÁNG NÀY CẦN THANH TOÁN NGAY:</strong> ${formatVND(
        v("SỐ TIỀN CẦN THANH TOÁN NGAY")
      )}</li>
    </ul>

    <p><em>"Căn cứ theo Hợp đồng tín dụng số TIN VAY giữa Ông/Bà và VIETCREDIT, đến thời điểm hiện tại khoản vay đã quá hạn nghiêm trọng. Đã liên hệ và tạo điều kiện nhưng chưa nhận được sự hợp tác cụ thể. Hồ sơ vay đang xem xét chuyển sang đơn vị hỗ trợ xử lý và thu hồi bên ngoài theo quy định: Làm việc tại nơi cư trú/công tác; Gửi thông báo trực tiếp; Áp dụng các biện pháp pháp lý theo hợp đồng."</em></p>

    <p><strong>Đề nghị:</strong> Hoàn thành trách nhiệm <strong>thanh toán ít nhất 1 kỳ nợ quá hạn trước 19h hôm nay</strong> hoặc liên hệ để thống nhất phương án tất toán/cơ cấu (nếu đủ điều kiện).</p>

    <div class="footer">
      <p>Nếu cần hỗ trợ thêm thông tin hoặc hướng dẫn thanh toán, vui lòng liên hệ:</p>
      <p>- Tổng đài CSKH: <strong>1900 6515</strong></p>
      <p>- Zalo CSKH hỗ trợ: <strong>Giai Vy – 0528 778 591</strong></p>
      <p><strong>⚠️ KHẨN CẤP TRẢ NỢ 1 KỲ GÓP ĐANG VI PHẠM QUÁ HẠN NGAY</strong><br/>Phòng Xử Lý Nợ Xấu Tin Vay</p>
    </div>
  </div>
</body>
</html>`;

    // =======================
    // CASE 13: THÔNG BÁO NGHIÊM TRỌNG – CHUYỂN HỒ SƠ PHÁP LÝ
    // =======================
    case 13:
      return `<!doctype html>
<html lang="vi">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1"/>
  <title>[TIN VAY - THÔNG BÁO NGHIÊM TRỌNG: Chuẩn bị chuyển hồ sơ pháp lý]</title>
 ${style}
</head>
<body>
  <div class="card">
    <h1>[TIN VAY - THÔNG BÁO NGHIÊM TRỌNG]: Khoản vay chưa thanh toán – Chuẩn bị chuyển hồ sơ pháp lý</h1>

    <p>Kính gửi Ông/Bà <strong>${v("HỌ VÀ TÊN")}</strong></p>

    <ul>
      <li><strong>Mã hợp đồng:</strong> ${v("MÃ KHOẢN VAY")}</li>
      <li><strong>CCCD:</strong> ${v("CCCD")}</li>
      <li><strong>Số điện thoại:</strong> ${v("ĐIỆN THOẠI")}</li>
      <li><strong>Địa chỉ:</strong> ${v("ĐỊA CHỈ")}</li>
      <li><strong>Họ Tên Tham Chiếu 1:</strong> ${v("HỌ TÊN THAM CHIẾU 1")}</li>
      <li><strong>Họ Tên Tham Chiếu 2:</strong> ${v("HỌ TÊN THAM CHIẾU 2")}</li>
      <li><strong>Số Tiền Vay:</strong> ${formatVND(v("SỐ TIỀN VAY"))}</li>
      <li><strong>Tổng kỳ hạn trả góp:</strong> ${v("KỲ HẠN")}</li>
      <li><strong>Số Tiền Dư Nợ gốc:</strong> ${formatVND(
        v("SỐ TIỀN DƯ NỢ GỐC")
      )}</li>
      <li><strong>SỐ TIỀN TRẢ GÓP THÁNG NÀY CẦN THANH TOÁN NGAY:</strong> ${formatVND(
        v("SỐ TIỀN CẦN THANH TOÁN NGAY")
      )}</li>
    </ul>

    <p><em>"Bộ phận Thu hồi nợ thuộc Công ty Tài chính VietCredit gửi thông báo chính thức: Hợp đồng vay tiêu dùng của Quý khách đang quá hạn nhiều ngày và chưa có động thái thanh toán, dù đã được thông báo nhiều lần.</em></p>
    <p>Căn cứ quy trình nội bộ, VietCredit sẽ <strong>chuyển hồ sơ sang Phòng Pháp lý</strong> phối hợp đơn vị kiểm tra địa bàn, bao gồm: Gửi thông báo xác minh đến nơi cư trú, địa phương, nơi công tác (nếu có); Cập nhật tình trạng nợ xấu lên hệ thống CIC toàn quốc, ảnh hưởng trực tiếp khả năng vay vốn/mua trả góp/mở thẻ tín dụng.</p>
    <p><strong>➤ Hạn cuối để chủ động thanh toán:</strong> Trước 19h ngày hôm nay. Sau thời điểm này, hồ sơ nợ sẽ được xử lý theo chế độ pháp lý không thương lượng, đồng nghĩa mọi quyền lợi tín dụng sẽ bị đình chỉ.</p>
    <p>VietCredit đề nghị Quý khách chủ động khắc phục ngay trong hôm nay để tránh các hậu quả không mong muốn.</p>

    <div class="footer">
      <p>Nếu cần hỗ trợ thêm thông tin hoặc hướng dẫn thanh toán, vui lòng liên hệ:</p>
      <p>- Tổng đài CSKH: <strong>1900 6515</strong></p>
      <p>- Zalo CSKH hỗ trợ: <strong>Giai Vy – 0528 778 591</strong></p>
      <p><strong>⚠️ YÊU CẦU TRẢ NỢ 1 KỲ GÓP ĐANG VI PHẠM QUÁ HẠN NGAY</strong><br/>Phòng Xử Lý Nợ Xấu Tin Vay</p>
    </div>
  </div>
</body>
</html>`;

    default:
      throw new Error(
        "type phải là 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13"
      );
  }
}

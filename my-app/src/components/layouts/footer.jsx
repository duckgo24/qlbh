import { FaFacebook, FaLinkedin, FaTelegram } from "react-icons/fa";



function Footer() {
    return (
        <div className="footer flex flex-col gap-5 bg-white pt-7 pb-2 px-4 mt-4">
            <div className="flex justify-between">
                <div className="flex items-center justify-center flex-col gap-2">
                    <img src="../images/giao_hang.webp" alt="logo1" className="h-14 w-20"/>
                    <p className="text-red-500 uppercase font-bold">Giao hàng nhanh chóng</p>
                </div>
                <div className="flex items-center justify-center flex-col gap-2">
                    <img src="../images/doi_tra.webp" alt="logo1" className="h-14 w-16"/>
                    <p className="text-red-500 uppercase font-bold">Bảo hành 1 đổi 1</p>
                </div>
                <div className="flex items-center justify-center flex-col gap-2">
                    <img src="../images/tu_van.webp" alt="logo1" className="h-16 w-16"/>
                    <p className="text-red-500 uppercase font-bold">Tư vấn nhiệt tình</p>
                </div>
                <div className="flex items-center justify-center flex-col gap-2">
                    <img src="../images/thanh_toan.webp" alt="logo1" className="h-14 w-26"/>
                    <p className="text-red-500 uppercase font-bold">Thanh toán đa dạng</p>
                </div>
            </div>
            <div className="flex justify-between">
                <div className="flex flex-col gap-2">
                    <p>Địa chỉ: Thị xã Mỹ Hào, Hưng Yên</p>
                    <p>Số điện thoại: 0123456789</p>
                    <p>Email:test@gmail.com</p>
                    <p>Thời gian mở cửa: 8:00 - 22:00</p>
                </div>
                <div >
                    <p>Kết nối với chúng tôi</p>
                    <div className="flex justify-between items-center py-2">
                        <FaFacebook size={30}/>
                        <FaTelegram size={30} />
                        <FaLinkedin size={30}/>
                    </div>
                </div>
            </div>
            <p className="text-center">© 2024 - Bản quyền thuộc về Pepe Coin</p>
        </div>
    );
}

export default Footer;

import { useEffect, useLayoutEffect, useState } from "react";
import { CiSearch, CiShoppingCart, CiUser } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import Cookies from 'js-cookie';
import { Link, useNavigate } from "react-router-dom";

import { Modal, Popover } from "@mui/material";
import RenderWithCondition from "../RenderWithCondition";
import SignIn from "../Sign-in";
import SignUp from "../Sign-up";
import { setMyAccount } from "../../redux/slice/account.slice";
import useDebounce from "../../hooks/useDebounce";
import { productService } from "../../services/ProductService";


function Header() {

    const { my_account } = useSelector(state => state.account);
    const dispath = useDispatch();
    const [openModal, setOpenModal] = useState(false);
    const [openSignIn, setOpenSignIn] = useState(true);
    const [anchorElTaiKhoan, setAnchorElTaiKhoan,] = useState(null);
    const [openOptTaiKhoan, setOpenOptTaiKhoan,] = useState(false);
    const [inputSearch, setInputSearch] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const navigate = useNavigate();

    const debounceValue = useDebounce(inputSearch, 500);

    const handleSearchSanPham = (e) => {
        setInputSearch(e.target.value);
    }

    const handleOnClickTaiKhoan = (e) => {
        setAnchorElTaiKhoan(e.currentTarget);
        setOpenOptTaiKhoan(true);
    }

    const toggleSignInForm = () => {
        setOpenModal(true);
        setOpenSignIn(true);
    }

    const toggleSignUpForm = () => {
        setOpenModal(true);
        setOpenSignIn(false);
    }

    const handleClickLogOut = (e) => {
        dispath(setMyAccount(null));
        Cookies.remove('access_token');
        Cookies.remove('refresh_token');
    }

    const handleClickSanPham = (pro) => {
        navigate(`/san-pham/${pro?.ma_sp}`, {
            state: {
                ma_sp: pro?.ma_sp
            }
        });
        setInputSearch('');
    }

    useLayoutEffect(() => {

        if(!debounceValue) {
            setSearchResult([]);
        }

        if (debounceValue) {
            productService.searchProduct({ keyword: debounceValue }).then(data => {
                if (data) {
                    setSearchResult(data);
                }
            });
        }
    }, [debounceValue]);


    return (
        <div className="header px-2 flex items-center justify-between h-28 border-b border-solid border-blue-100 bg-white">
            <div>
                <Link to="/" className="flex items-center gap-2">
                    <img src="../images/pepe.jpg" alt="logo" className="h-14 w-20 rounded" />
                    <span className="font-bold uppercase text-sm">Pepe - cửa hàng pepe</span>
                </Link>
            </div>
            <div className="flex w-1/2 relative">
                <input type="text" onChange={handleSearchSanPham} value={inputSearch} placeholder="Tim kiếm sản phẩm...." className="border-2 border-gray-300 p-2 outline-none text-base rounded-l-2xl flex-1" />
                <button className="bg-orange-400 flex items-center justify-center px-2 py-1 text-white text-base rounded-r-2xl">
                    <CiSearch size={40} />
                    <span className="text-base font-bold">Tìm kiếm</span>
                </button>
                <RenderWithCondition condition={inputSearch.length > 0}>
                <div className="absolute bg-white w-full border border-solid border-gray-300 rounded-lg top-14 z-50">
                    {searchResult && searchResult.length > 0 && searchResult.map(pro => (
                       <button onClick={() => handleClickSanPham(pro)} key={pro.ma_sp} className="flex justify-between px-4 py-3 w-full hover:bg-slate-200 hover:cursor-pointer">
                            <p>{pro.ten_sp}</p>
                            <img src={pro.hinh_anh} alt={pro.ten_sp} className="h-5 w-5"/>
                        </button>
                    ))}
                   {searchResult.length === 0 && inputSearch.length > 0 &&  <p  className=" px-4 py-3">Không tồn tại sản phẩm "{inputSearch}"</p>}

                </div>
                </RenderWithCondition>
            </div>
            <RenderWithCondition condition={!my_account}>
                <div>
                    <button onClick={toggleSignUpForm} className="text-base p-4">Đăng ký</button>
                    <button onClick={toggleSignInForm} className="text-base font-bold bg-orange-400 py-2 px-6 text-white rounded-xl">Đăng nhập</button>
                    <Modal
                        open={openModal}
                        onClose={() => setOpenModal(false)}
                        className="flex justify-center items-center"
                    >
                        {
                            openSignIn
                                ?
                                <SignIn onClickSignUp={() => setOpenSignIn(false)} onLoginSuccess={() => setOpenModal(false)} />
                                :
                                <SignUp onClickSignIn={() => setOpenSignIn(true)} onSignUpSuccess={() => setOpenSignIn(true)} />
                        }
                    </Modal>
                </div>
            </RenderWithCondition>
            <RenderWithCondition condition={my_account}>
                <div className={"flex gap-3"}>
                    <button onClick={handleOnClickTaiKhoan} className="text-base font-bold ml-2 flex flex-col justify-between items-center">
                        <CiUser size={40} />
                        <span className="text-base font-bold">Tài khoản</span>
                    </button>
                    <Popover
                        open={openOptTaiKhoan}
                        anchorEl={anchorElTaiKhoan}
                        onClose={() => setOpenOptTaiKhoan(false)}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}

                    >
                        <div className="px-2 w-52 flex flex-col">
                            <Link to="/thong-tin-nguoi-dung" className="text-base font-bold ml-2 text-start px-2 py-2 hover:opacity-45">
                                Tài khoản của tôi
                            </Link>
                            <Link to="/don-hang" className="text-base font-bold ml-2 px-2 py-2 text-start hover:opacity-45">Hóa đơn của tôi</Link>
                            <button onClick={handleClickLogOut} className="text-base font-bold ml-2 px-2 py-2 text-start hover:opacity-45">Đăng xuất</button>
                        </div>
                    </Popover>
                    <div>

                    </div>

                    <Link to="/gio-hang" className="flex flex-col justify-between items-center relative">
                        <CiShoppingCart size={40} />
                        <span className="text-base font-bold">Giỏ hàng</span>
                        {/* <span className="text-base font-bold text-red-500 absolute top-0 right-1 bg-cyan-200 rounded-full px-2">0</span> */}
                    </Link>
                </div>
            </RenderWithCondition>

        </div>
    );
}

export default Header;



import React, { Children } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

import { IoHomeOutline } from "react-icons/io5";
import { BiCategory } from "react-icons/bi";
import { BiPurchaseTagAlt } from "react-icons/bi";
import { MdOutlineSwitchAccount } from "react-icons/md";
import { RiProductHuntLine } from "react-icons/ri";
import { FiShoppingCart } from "react-icons/fi";


export default function LayoutAdmin({ children }) {

    const navigate = useNavigate();
    const navbarList = [
        {
            name: 'Home',
            link: "/admin",
            icon: <IoHomeOutline size={30} />,
            onClick: () => navigate('/admin')
        },
        {
            name: 'Tài khoản',
            link: "/admin/tai-khoan",
            icon: <MdOutlineSwitchAccount size={30} />,
            onClick: () => navigate('/admin/tai-khoan')
        },
        {
            name: 'Danh Mục',
            link: "/admin/danh-muc",
            icon: <BiCategory size={30} />,
            onClick: () => navigate('/admin/danh-muc')
        },
        {
            name: 'Sản phẩm',
            link: "/admin/san-pham",
            icon: <RiProductHuntLine size={30}  />,
            onClick: () => navigate('/admin/san-pham')
        },
        {
            name: 'Hóa đơn bán',
            link: "/admin/hoa-don-ban",
            icon: <FiShoppingCart size={30} />,
            onClick: () => navigate('/admin/hoa-don-ban')
        } ,
        {
            name: 'Hóa đơn nhập',
            link: "/admin/hoa-don-nhap",
            icon: <BiPurchaseTagAlt size={30} />,
            onClick: () => navigate('/admin/hoa-don-nhap')
        }
        
    ]


    return (
        <div
            className='flex flex-col'
            style={{
                height: '100vh',
            }}>
            <Link to={"/"} className="bg-orange-200 px-5 py-4 flex items-center gap-4 border-b-2 border-solid border-gray-300">
                <img src="../images/pepe.jpg" className='w-20 h-12' />
                <p>Trang quản trị</p>
            </Link>
            <div className='flex flex-1'>
                <List className='w-56 bg-orange-200 h-full'>
                    {navbarList.map((nav, idx) => (
                        <ListItem key={idx} disablePadding>
                            <ListItemButton onClick={nav.onClick}>
                                <ListItemIcon>
                                    {nav.icon}
                                </ListItemIcon>
                                <ListItemText className='text-xl' primary={nav.name} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <div className='flex-1 flex flex-col'>
                    <div className='flex-1 bg-gray-300'>
                        {children}
                    </div>
                    <div className='px-4 py-4 border-t  border-solid border-gray-500'>© 2024 - Bản quyền thuộc về Pepe</div>
                </div>
            </div>


        </div>
    );
}

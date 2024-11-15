import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cookies from 'js-cookie';
import Carousel from 'react-material-ui-carousel'


import { accountService } from "../services/AccountService";
import { productService } from "../services/ProductService";

import { setMyAccount } from "../redux/slice/account.slice";
import { setListProduct, setProductBestSale, setProductNew } from "../redux/slice/product.slice";
import ListProduct from "../components/product_component/List-Product";
import DanhMuc from "../components/danhmuc_component/DanhMuc";


function Home() {
    const { my_account } = useSelector((state) => state.account);
    const { productBestSales, productNews } = useSelector((state) => state.product);
    const dispatch = useDispatch();

    const { data: authData, isSuccess: isFetchAuthSuccess, isError: isFetchAuthError } = useQuery({
        queryKey: ["auth"],
        queryFn: accountService.Auth,
        enabled: !!Cookies.get("access_token"), 
    });


    const { data: productBestSaleData, isSuccess: isfetchProductBestSaleSuccess } = useQuery({
        queryKey: ['product-best-sales'],
        queryFn: () => productService.getProductBestSales({ limit: 3 }),
    })

    const { data: productNewData, isSuccess: isFetchProductNewSuccess } = useQuery({
        queryKey: ['product-new'],
        queryFn: () => productService.getProductNew({ limit: 3 }),
    })

    const { data: productAllData, isSuccess: isFetchProductAllSuccess } = useQuery({
        queryKey: ['product-all'],
        queryFn: productService.getAllProduct
    })

    useEffect(() => {
        if (isFetchAuthSuccess) {
            dispatch(setMyAccount(authData));
        }

        if(isFetchProductAllSuccess) {
            dispatch(setListProduct(productAllData));  
        }

        if(isFetchAuthError) {
            dispatch(setMyAccount(null));
        }

        if (isfetchProductBestSaleSuccess) {
            dispatch(setProductBestSale(productBestSaleData));
        }

        if (isFetchProductNewSuccess) {
            dispatch(setProductNew(productNewData));
        }

    }, [isFetchAuthSuccess, isfetchProductBestSaleSuccess, isFetchProductNewSuccess, isFetchProductAllSuccess]);


    return (
        <div className="home">
            <div className="slider">
                <Carousel className="h-auto">
                    <img src="./images/banner.png" alt="slider1" className="w-full h-full" />
                    <img src="./images/banner.png" alt="slider2" className="w-full h-full" />
                    <img src="./images/banner.png" alt="slider3" className="w-full h-full" />
                </Carousel>
            </div>
            <div className="grid grid-cols-2 gap-3">
                <div className="bg-white pt-2 pb-7 px-2 rounded-md">
                    <div className="flex justify-between py-2">
                        <p className="border-l-4 border-solid border-black px-2 uppercase font-bold">Sản phẩm bán chạy</p>
                        <Link className="text-sm hover:underline" to='/'>{"Xem tất cả >>"}</Link>
                    </div>
                    <ListProduct listProduct={productBestSales} />
                </div>
                <div className="bg-white pt-2 pb-7 px-2 rounded-md">
                    <div className="flex justify-between py-2">
                        <p className="border-l-4 border-solid border-black px-2 uppercase font-bold">Sản phẩm mới</p>
                        <Link className="text-sm hover:underline" to='/'>{"Xem tất cả >>"}</Link>
                    </div>
                    <ListProduct listProduct={productNews} />
                </div>
            </div>
            <div className="mt-5 bg-white px-2 pt-4 pb-10" style={{ minHeight: 690}}>
                <DanhMuc />
            </div>
        </div>
    );
}

export default Home;

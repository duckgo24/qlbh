import { useDispatch, useSelector } from "react-redux";
import ListProduct from "../../product_component/List-Product";
import { useQuery } from "@tanstack/react-query";
import { productService } from "../../../services/ProductService";
import { useEffect, useState } from "react";
import { setProductByDanhMuc } from "../../../redux/slice/product.slice";
import { Link } from "react-router-dom";
import { setDanhMuc } from "../../../redux/slice/danhmuc.slice";
import { danhMucService } from "../../../services/DanhMucSevice";

function DanhMuc() {
    const { productByDanhMuc } = useSelector((state) => state.product);
    const { list_danhmuc } = useSelector((state) => state.danhmuc);
    const dispatch = useDispatch();

    const [selectedCategory, setSelectedCategory] = useState((list_danhmuc?.[0]?.ma_dm || ''));

    const { data: danhMucData, isSuccess: isFetchDanhMucSuccess } = useQuery({
        queryKey: ['danhmuc'],
        queryFn: danhMucService.getAllDanhMuc
    });

    const { data: productByDanhMucData, isSuccess: isFetchProductByDanhMucSuccess } = useQuery({
        queryKey: ['product-by-danhmuc', selectedCategory],
        queryFn: () => productService.getProductByDanhMuc({
            ma_dm: selectedCategory,
            limit: 6
        }),
        enabled: !!selectedCategory
    });

    const handleOnChangeDanhMuc = (e) => {
        const newCategory = e.target.value;
        setSelectedCategory(newCategory);
    };

    useEffect(() => {
        if (isFetchProductByDanhMucSuccess) {
            dispatch(setProductByDanhMuc(productByDanhMucData));
        }
        if (isFetchDanhMucSuccess) {
            dispatch(setDanhMuc(danhMucData));
        }
    }, [isFetchProductByDanhMucSuccess, isFetchDanhMucSuccess, dispatch, productByDanhMucData, danhMucData]);

    return (
        <div className="danh-muc flex gap-2" style={{
            height: "615px"
        }}>
            <div className="w-1/5 pr-2 flex flex-col">
                <div className="pt-2 pb-3 border-b-4 border-solid border-red-500 text-red-500 font-bold uppercase text-lg">
                    <form className="max-w-sm mx-auto">
                        <label className="ml-1">Danh mục</label>
                        <select onChange={handleOnChangeDanhMuc} value={selectedCategory} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 outline-none">
                            {list_danhmuc && list_danhmuc.map((danhmuc) => (
                                <option key={danhmuc.ma_dm} value={danhmuc.ma_dm}>
                                    {danhmuc.ten_dm}
                                </option>
                            ))}
                        </select>
                    </form>
                </div>
                <Link to={`/danh-muc`} className="px-11 py-2 bg-red-500 text-white text-center mt-2">Xem tất cả</Link>
            </div>
            <div className="w-1/5">
                <img src="./images/dung_cu_dien.webp" alt="dung_cu_dien" className="h-full w-full" />
            </div>
            <div className="flex-1">
                <ListProduct listProduct={productByDanhMuc} />
            </div>
        </div>
    );
}

export default DanhMuc;

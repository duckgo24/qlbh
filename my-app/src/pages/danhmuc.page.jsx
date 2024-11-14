import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import ListProduct from "../components/product_component/List-Product";
import { setProductByDanhMuc } from "../redux/slice/product.slice";
import { setDanhMuc } from "../redux/slice/danhmuc.slice";
import { danhMucService } from "../services/DanhMucSevice";
import { productService } from "../services/ProductService";

export default function DanhMucPage() {
    const { productByDanhMuc } = useSelector((state) => state.product);
    const { list_danhmuc } = useSelector((state) => state.danhmuc);
    const dispatch = useDispatch();

    const [selectedCategory, setSelectedCategory] = useState(list_danhmuc?.[0]?.ma_dm || '');
    const [btnActive, setBtnActive] = useState(0);
    const [sortedProducts, setSortedProducts] = useState(productByDanhMuc);

    const { data: danhMucData, isSuccess: isFetchDanhMucSuccess } = useQuery({
        queryKey: ['danhmuc'],
        queryFn: danhMucService.getAllDanhMuc,
    });

    const { data: productByDanhMucData, isSuccess: isFetchProductByDanhMucSuccess } = useQuery({
        queryKey: ['product-by-danhmuc', selectedCategory],
        queryFn: () => productService.getProductByDanhMuc({
            ma_dm: selectedCategory,
            limit: 6,
        }),
        enabled: !!selectedCategory,
    });

    useEffect(() => {
        if (isFetchProductByDanhMucSuccess) {
            dispatch(setProductByDanhMuc(productByDanhMucData));
            setSortedProducts(productByDanhMucData);
        }
        if (isFetchDanhMucSuccess) {
            dispatch(setDanhMuc(danhMucData));
        }
    }, [isFetchProductByDanhMucSuccess, isFetchDanhMucSuccess, dispatch, productByDanhMucData, danhMucData]);

    const handleOnChangeDanhMuc = (e) => {
        const newCategory = e.target.value;
        setSelectedCategory(newCategory);
    };

    const handleSortButtonClick = (index, sortOption = null) => {
        setBtnActive(index);
        if (sortOption) {
            setSortedProducts(applySorting(productByDanhMuc, sortOption));
        } else {
            setSortedProducts(productByDanhMuc);
        }
    };

    const handleSortByPrice = (e) => {
        const sortOption = e.target.value === "1" ? "giá thấp đến cao" : e.target.value === "2" ? "giá cao đến thấp" : null;
        if (sortOption) {
            setSortedProducts(applySorting(productByDanhMuc, sortOption));
        } else {
            setSortedProducts(productByDanhMuc);
        }
    };

    const applySorting = (arr, option) => {
        const sortedArray = [...arr];
        if (option === "giá cao đến thấp") {
            return sortedArray.sort((a, b) => b.gia_ban - a.gia_ban);
        }
        if (option === "giá thấp đến cao") {
            return sortedArray.sort((a, b) => a.gia_ban - b.gia_ban);
        }
        if (option === "mới nhất") {
            return sortedArray.sort((a, b) => new Date(b.ngay_tao) - new Date(a.ngay_tao));
        }
        return arr;
    };

    return (
        <div className="danh-muc flex gap-2 bg-white mt-4 px-2 pt-5 pb-8">
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
            </div>
            <div className="w-1/5">
                <img src="../images/dung_cu_dien.webp" alt="dung_cu_dien" className="h-full w-full" />
            </div>
            <div className="flex-1">
                <div className="flex items-center gap-6 p-2 bg-gray-300">
                    <p>Sắp xếp theo </p>
                    <button onClick={() => handleSortButtonClick(0)} className={`px-4 py-2 ${btnActive === 0 ? 'bg-orange-500 text-white' : 'bg-white'}`}>Phổ biến</button>
                    <button onClick={() => handleSortButtonClick(1, "mới nhất")} className={`px-4 py-2 ${btnActive === 1 ? 'bg-orange-500 text-white' : 'bg-white'}`}>Mới nhất</button>
                    <select onChange={handleSortByPrice} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm block p-2.5 outline-none">
                        <option value="0">Sắp xếp theo giá</option>
                        <option value="1">Giá từ thấp đến cao</option>
                        <option value="2">Giá từ cao đến thấp</option>
                    </select>
                </div>
                <div className="mt-3">
                    <ListProduct listProduct={sortedProducts} />
                </div>
            </div>
        </div>
    );
}

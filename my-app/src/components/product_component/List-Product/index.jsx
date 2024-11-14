import { Box } from "@mui/material";
import Product from "../Product";


function ListProduct({ listProduct }) {
    return (
        <Box className="grid grid-cols-3 gap-1">
            {listProduct.map((product) => (
                <Product key={product.ma_sp} product={product} />
            ))}
        </Box>
    );
}

export default ListProduct;
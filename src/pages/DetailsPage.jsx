import { Link, useParams } from "react-router-dom";
import { SiOpenproject } from "react-icons/si";
import { FaArrowLeft } from "react-icons/fa";
import { IoMdPricetags } from "react-icons/io";

import { useProductDetails } from "../context/Products";
import Loader from "../component/Loader";
import { shortenText } from "../helpers/helpers";

import styles from "./DetailsPage.module.css";

function DetailsPage() {
  const { id } = useParams();
  const productDetails = useProductDetails(+id);
  console.log(productDetails);
  if (!productDetails) return <Loader />;
  return (
    <div className={styles.container}>
      <img src={productDetails.image} alt={shortenText(productDetails.title)} />
      <div className={styles.information}>
        <h3 className={styles.title}>{productDetails.title}</h3>
        <p className={styles.description}>{productDetails.description}</p>
        <p className={styles.category}>
          <SiOpenproject />
          {productDetails.category}
        </p>
        <div>
          <span className={styles.price}>
            <IoMdPricetags />
            {productDetails.price} $
          </span>
          <Link to="/products">
            <FaArrowLeft />
            <span>Back To Shop</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default DetailsPage;

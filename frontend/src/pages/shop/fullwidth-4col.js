import { useState, useEffect } from "react";
import Paginator from "react-hooks-paginator";
import { getProductBySort } from "../../common/productSelect";
import { Breadcrumb, BreadcrumbItem } from "../../components/Other/Breadcrumb";
import LayoutFour from "../../components/Layout/LayoutFour";
import ShopProducts from "../../components/Shop/ShopProducts";
import ShopHeader from "../../components/Shop/ShopHeader";
import InstagramTwo from "../../components/Sections/Instagram/InstagramTwo";

export default function ShopFullwidth() {
  const pageLimit = 12;
  const [offset, setOffset] = useState(0);
  const [currentView, setCurrentView] = useState();
  const [currentSort, setCurrentSort] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [currentData, setCurrentData] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [categories, setCategories] = useState({}); // Estado para las categorías

  async function fetchCategories() {
    try {
      const response = await fetch('http://localhost:8090/api/collections/categories/records');
      const data = await response.json();
      const categoriesMap = {};
      data.items.forEach((category) => {
        categoriesMap[category.id] = category.categorieName;
      });
      setCategories(categoriesMap);
      fetchProductData(categoriesMap); 
    } catch (error) {
      console.error('Error fetching categories data:', error);
    }
  }

  async function fetchProductData(categoriesMap) {
    try {
      const response = await fetch('http://localhost:8090/api/collections/products/records');
      const data = await response.json();
      setTotalRecords(data.totalItems);
      let formattedData = data.items.map(item => {
        const thumbImageUrl = item.thumbImage_270x345 ? 
          `http://localhost:8090/api/files/${item.collectionId}/${item.id}/${item.thumbImage_270x345}` : 
          undefined;
        const imagesArray = item.image_270x345 && Array.isArray(item.image_270x345) ? 
          item.image_270x345.map(img => 
            `http://localhost:8090/api/files/${item.collectionId}/${item.id}/${img}`
          ) : [];

        return {
          id: item.id,
          category: item.categorieName.map((categoryId) => categoriesMap[categoryId]).filter(Boolean),
          name: item.name,
          rate: item.rate,
          price: item.price,
          new: item.new,
          brand: item.brand,
          code: item.code,
          point: item.point,
          quantity: item.quantity,
          colorVariations: [
            {
              color: "red",
              colorCode: "#8B0000",
              image: "/assets/images/product/color1.png"
            },
            {
              color: "blue",
              colorCode: "#4169E1",
              image: "/assets/images/product/color2.png"
            }],
          thumbImage: thumbImageUrl,
          images: imagesArray,
          description: item.description,
          slug: item.slug
        };
      });
      let sortedProduct = getProductBySort(formattedData, currentSort);
      setCurrentData(sortedProduct.slice(offset, offset + pageLimit));
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  }

  useEffect(() => {
    fetchCategories();
    // Dependencias para useEffect
  }, [offset, currentSort]);
  
  return (
    <LayoutFour title="TIENDA" container="wide">
      <Breadcrumb title="TIENDA">
        <BreadcrumbItem name="INICIO" />
        <BreadcrumbItem name="TIENDA" current />
      </Breadcrumb>
      <div className="shop">
        <div className="container-full-half">
          <ShopHeader
            view={currentView}
            getCurrentSort={setCurrentSort}
            getCurrentView={(view) => setCurrentView(view)}
          />
          <ShopProducts
            gridColClass="col-12 col-sm-6 col-md-4 col-lg-3"
            listColClass="col-12 col-lg-6"
            view={currentView}
            data={currentData}
          />
          <Paginator
            pageContainerClass="paginator"
            totalRecords={totalRecords}
            pageLimit={pageLimit}
            pageNeighbours={2}
            setOffset={setOffset}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>
    </LayoutFour>
  );
}
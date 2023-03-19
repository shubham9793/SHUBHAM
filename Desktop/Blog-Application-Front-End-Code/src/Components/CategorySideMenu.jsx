import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ListGroup, ListGroupItem } from "reactstrap";
import { loadAllCategory } from "../Services/category-service";
function CategorySideMenu() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadAllCategory()
      .then((data) => {
        setCategories([...data]);
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <h5> Available Category</h5>
      <ListGroup className="mt30">
        <ListGroupItem tag={Link} to="/" action={true}>
          All Blogs
        </ListGroupItem>
        {categories &&
          categories.map((cat, index) => {
            return (
              <ListGroupItem
                className="border-0 shadow-0 mt10"
                tag={Link}
                to={'/categories/' + cat.categoryId}
                action={true}
                key={index}
              >
                {cat.categoryTitle}
              </ListGroupItem>
            );
          })}
      </ListGroup>
    </div>
  );
}

export default CategorySideMenu;

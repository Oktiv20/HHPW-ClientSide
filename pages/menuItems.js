import { useEffect, useState } from 'react';
import { getAllItems } from '../api/menuData';
import MenuItemCard from '../components/MenuItemCard';

export default function MenuItems() {
  const [menuItems, setMenuItems] = useState([]);

  const getAllTheMenuItems = () => {
    getAllItems().then(setMenuItems);
  };

  useEffect(() => {
    getAllTheMenuItems();
  }, []);

  return (
    <div className="text-center my-4">
      <div className="d-flex flex-wrap">
        {menuItems?.map((menuItem) => (
          <MenuItemCard key={menuItem.menuItemId} menuItemObj={menuItem} onUpdate={getAllTheMenuItems} />
        ))}
      </div>
    </div>
  );
}

import { createContext, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

export const ApplicationContext = createContext();

export const ApplicationProvider = ({ children }) => {
  const [basket, setBasket] = useState([]);

  const addToBasket = useCallback((item) => {
    setBasket((prev) => {
      const existingItem = prev.find((i) => i.id === item.id);
      if (existingItem) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
        );
      }
      return [...prev, item];
    });
  }, []);

  const updateBasketItem = useCallback((id, quantity) => {
    setBasket((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  }, []);

  const removeFromBasket = useCallback((id) => {
    setBasket((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const clearBasket = useCallback(() => {
    setBasket([]);
  }, []);

  const value = {
    basket,
    setBasket,
    addToBasket,
    updateBasketItem,
    removeFromBasket,
    clearBasket,
  };

  return (
    <ApplicationContext.Provider value={value}>
      {children}
    </ApplicationContext.Provider>
  );
};

ApplicationProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

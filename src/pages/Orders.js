import React, { useState } from 'react';
import {
  Box, Button, Tabs, TabList, TabPanels, Tab, TabPanel,
} from '@chakra-ui/react';
import SaleOrderModal from '../components/SaleOrderModal';
import OrderTable from '../components/OrderTable';
import useOrders from '../components/useOrders';

const Orders = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const { orders, addOrder, updateOrder } = useOrders();

  const activeOrders = orders.filter(order => order.status === 'active');
  const completedOrders = orders.filter(order => order.status === 'completed');

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => {
    setModalOpen(false);
    setEditingOrder(null);
  };

  const handleAddOrder = (order) => {
    addOrder(order);
    handleCloseModal();
  };

  const handleEditOrder = (order) => {
    setEditingOrder(order);
    setModalOpen(true);
  };

  const handleUpdateOrder = (order) => {
    updateOrder(order);
    handleCloseModal();
  };

  return (
    <Box p="4" bg="black" color="white">
      <Button onClick={handleOpenModal} colorScheme="teal">+ Sale Order</Button>
      <SaleOrderModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={editingOrder ? handleUpdateOrder : handleAddOrder}
        order={editingOrder}
        readOnly={editingOrder && editingOrder.status === 'completed'}
      />
      <Tabs mt="4" colorScheme="teal">
        <TabList>
          <Tab>Active Sale Orders</Tab>
          <Tab>Completed Sale Orders</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <OrderTable orders={activeOrders} onEdit={handleEditOrder} />
          </TabPanel>
          <TabPanel>
            <OrderTable orders={completedOrders} onEdit={handleEditOrder} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default Orders;
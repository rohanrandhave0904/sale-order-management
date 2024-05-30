import React from 'react';
import {
  Box, Table, Thead, Tbody, Tr, Th, Td, IconButton, Avatar, Text, VStack, HStack, Button,
} from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';

const OrderTable = ({ orders, onEdit }) => {
  return (
    <Box bg="black" p="4" borderRadius="md" color="white">
      <Table variant="unstyled">
        <Thead>
          <Tr>
            <Th>ID</Th>
            <Th>Customer Name</Th>
            <Th>Price (₹)</Th>
            <Th>Last Modified</Th>
            <Th>Edit/View</Th>
          </Tr>
        </Thead>
        <Tbody>
          {orders.map(order => (
            <Tr key={order.id}>
              <Td>{order.id}</Td>
              <Td>
                <HStack>
                  <Avatar name={order.customerName} />
                  <VStack align="start" spacing="0">
                    <Text>{order.customerName}</Text>
                    <Text fontSize="sm" color="gray.500">{order.customerId}</Text>
                  </VStack>
                </HStack>
              </Td>
              <Td>₹ {order.totalAmount}</Td>
              <Td>{new Date(order.lastModified).toLocaleString()}</Td>
              <Td>
                <IconButton
                  icon={<EditIcon />}
                  onClick={() => onEdit(order)}
                  isDisabled={order.status === 'completed'}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </Box>
  );
};

export default OrderTable;
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  Box,
  HStack,
  Text,
  VStack,
} from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const productsList = [
  { label: 'Product 5', value: 'product5', remaining: 104 },
  { label: 'Stocked Product I', value: 'stockedProductI', remaining: 150 },
  { label: 'Benoit Saint Denis', value: 'benoitSaintDenis', remaining: 90 },
  { label: 'Anonymous Product', value: 'anonymousProduct', remaining: 120 },
  { label: 'Stocked Tea I', value: 'stockedTeaI', remaining: 200 },
  { label: 'Stocked Tea II', value: 'stockedTeaII', remaining: 180 },
];

const SaleOrderModal = ({ isOpen, onClose, onSubmit, order, readOnly }) => {
  const { handleSubmit, register, reset, control } = useForm();
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    if (order) {
      reset(order);
      setSelectedProducts(order.items || []);
    }
  }, [order, reset]);

  const submitHandler = (data) => {
    data.items = selectedProducts;
    onSubmit(data);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{order ? 'Edit Sale Order' : 'Create Sale Order'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <form id="sale-order-form" onSubmit={handleSubmit(submitHandler)}>
            <FormControl>
              <FormLabel>Customer ID</FormLabel>
              <Input
                type="text"
                {...register('customerId', { required: true })}
                isReadOnly={readOnly}
              />
            </FormControl>
            <FormControl mt="4">
              <FormLabel>Products</FormLabel>
              <Controller
                name="products"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    isMulti
                    options={productsList}
                    value={selectedProducts}
                    onChange={(selected) => setSelectedProducts(selected || [])}
                    isDisabled={readOnly}
                  />
                )}
              />
            </FormControl>
            {selectedProducts.map((product, index) => (
              <Box key={index} p="4" mt="4" borderWidth="1px" borderRadius="md">
                <HStack justifyContent="space-between">
                  <Text>{index + 1}. {product.label}</Text>
                  <Text>Remaining: {product.remaining}</Text>
                </HStack>
                <FormControl mt="2">
                  <FormLabel>Selling Rate</FormLabel>
                  <Input
                    type="text"
                    placeholder="Enter selling rate"
                    {...register(`items[${index}].rate`, { required: true })}
                    isReadOnly={readOnly}
                  />
                </FormControl>
                <FormControl mt="2">
                  <FormLabel>Quantity</FormLabel>
                  <Input
                    type="text"
                    placeholder="Enter Quantity"
                    {...register(`items[${index}].quantity`, { required: true })}
                    isReadOnly={readOnly}
                  />
                </FormControl>
              </Box>
            ))}
            <FormControl mt="4">
              <FormLabel>Invoice Date</FormLabel>
              <Controller
                name="invoiceDate"
                control={control}
                render={({ field }) => (
                  <DatePicker {...field} selected={field.value} readOnly={readOnly} />
                )}
              />
            </FormControl>
          </form>
        </ModalBody>
        <ModalFooter>
          {!readOnly && (
            <Button colorScheme="teal" form="sale-order-form" type="submit">
              {order ? 'Update' : 'Create'}
            </Button>
          )}
          <Button onClick={onClose} ml="3">Cancel</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SaleOrderModal;
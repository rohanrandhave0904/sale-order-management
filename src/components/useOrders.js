import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const fetchOrders = async () => {
  // Replace with real API call
  return [
    { id: 1, customerName: 'John Doe', totalAmount: 150, status: 'active' },
    { id: 2, customerName: 'Jane Smith', totalAmount: 200, status: 'completed' },
    { id: 3, customerName: 'Sam Wilson', totalAmount: 300, status: 'active' },
  ];
};

const addOrder = async (newOrder) => {
  // Replace with real API call
  return newOrder;
};

const updateOrder = async (updatedOrder) => {
  // Replace with real API call
  return updatedOrder;
};

const useOrders = () => {
  const queryClient = useQueryClient();

  const { data: orders, ...queryInfo } = useQuery({
    queryKey: ['orders'],
    queryFn: fetchOrders,
  });

  const addMutation = useMutation({
    mutationFn: addOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });

  return {
    orders: orders || [],
    addOrder: addMutation.mutate,
    updateOrder: updateMutation.mutate,
    ...queryInfo,
  };
};

export default useOrders;
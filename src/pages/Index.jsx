import React, { useState } from "react";
import { Box, Button, Flex, Heading, IconButton, Image, Text, useDisclosure, Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, Input, Select, useToast } from "@chakra-ui/react";
import { FaPlus, FaShoppingCart } from "react-icons/fa";

const Index = () => {
  const [widgets, setWidgets] = useState([
    { id: 1, type: "title", content: "Welcome to our E-commerce Site" },
    { id: 2, type: "product", name: "Product 1", price: 19.99, image: "https://images.unsplash.com/photo-1486401899868-0e435ed85128?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxwcm9kdWN0JTIwMXxlbnwwfHx8fDE3MTExODA5NzV8MA&ixlib=rb-4.0.3&q=80&w=1080" },
    { id: 3, type: "product", name: "Product 2", price: 24.99, image: "https://images.unsplash.com/photo-1504274066651-8d31a536b11a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxwcm9kdWN0JTIwMnxlbnwwfHx8fDE3MTExODA5NzV8MA&ixlib=rb-4.0.3&q=80&w=1080" },
  ]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  const addWidget = (type, content) => {
    const newWidget = {
      id: widgets.length + 1,
      type,
      ...content,
    };
    setWidgets([...widgets, newWidget]);
    onClose();
    toast({
      title: "Widget added.",
      status: "success",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Box>
      <Flex justify="space-between" align="center" p={4} bg="gray.100">
        <Heading size="lg">My E-commerce Site</Heading>
        <IconButton icon={<FaShoppingCart />} aria-label="Shopping Cart" variant="outline" />
      </Flex>

      <Box p={4}>
        {widgets.map((widget) => (
          <Box key={widget.id} mb={8}>
            {widget.type === "title" && (
              <Heading size="xl" mb={4}>
                {widget.content}
              </Heading>
            )}
            {widget.type === "product" && (
              <Flex>
                <Image src={widget.image} alt={widget.name} boxSize="150px" objectFit="cover" mr={4} />
                <Box>
                  <Heading size="lg">{widget.name}</Heading>
                  <Text fontSize="xl" fontWeight="bold" color="green.500">
                    ${widget.price}
                  </Text>
                  <Button mt={2} colorScheme="blue">
                    Add to Cart
                  </Button>
                </Box>
              </Flex>
            )}
          </Box>
        ))}
      </Box>

      <Button leftIcon={<FaPlus />} colorScheme="teal" position="fixed" left="-100px" top="50%" transform="translateY(-50%)" transition="left 0.3s" _hover={{ left: "0" }} onClick={onOpen}>
        Add Widget
      </Button>

      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Add Widget</DrawerHeader>
          <DrawerBody>
            <Select
              placeholder="Select widget type"
              mb={4}
              onChange={(e) => {
                const type = e.target.value;
                if (type === "title") {
                  const content = prompt("Enter the title content:");
                  if (content) {
                    addWidget(type, { content });
                  }
                } else if (type === "product") {
                  const name = prompt("Enter the product name:");
                  const price = parseFloat(prompt("Enter the product price:"));
                  const image = prompt("Enter the product image URL:");
                  if (name && price && image) {
                    addWidget(type, { name, price, image });
                  }
                }
              }}
            >
              <option value="title">Title</option>
              <option value="product">Product</option>
            </Select>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default Index;

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  VStack,
  Text
} from "@chakra-ui/react";
import { CgSpinner } from "react-icons/cg";

interface ApiWakeUpModalProps {
  isOpen: boolean;
}

const ApiWakeUpModal = ({ isOpen }: ApiWakeUpModalProps) => {
  return (
    <Modal
      onClose={() => {}}
      isOpen={isOpen}
      isCentered
      closeOnOverlayClick={false}
      closeOnEsc={false}
    >
      <ModalOverlay bg="blackAlpha.700" backdropFilter="blur(4px)" />
      <ModalContent
        bg="#1a1f3a"
        border="1px solid"
        borderColor="gray.700"
        borderRadius="lg"
        maxW="400px"
        mx={4}
      >
        <ModalBody py={8} px={6}>
          <VStack spacing={4}>
            <CgSpinner className="animate-spin" size={40} color="#eceae5" />
            <VStack spacing={2}>
              <Text
                fontSize="lg"
                fontWeight="600"
                color="#eceae5"
                textAlign="center"
              >
                Waking up API
              </Text>
              <Text
                fontSize="sm"
                color="gray.400"
                textAlign="center"
                maxW="280px"
              >
                Our servers are waking up. This may take a few moments...
              </Text>
            </VStack>
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ApiWakeUpModal;

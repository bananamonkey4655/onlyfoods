import { ArrowBackIcon } from "@chakra-ui/icons";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  IconButton,
} from "@chakra-ui/react";

import { useRouter } from "next/router";

const Error = () => {
  const router = useRouter();
  return (
    <main className="flex-auto flex justify-center items-center">
      <Alert
        status="error"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        height="200px"
      >
        <AlertIcon boxSize="40px" mr={0} />
        <AlertTitle mt={4} mb={1} fontSize="lg">
          No restaurants found!
        </AlertTitle>
        <AlertDescription maxWidth="sm">
          <div className="flex flex-col items-center gap-2">
            <span>Try a different search term.</span>
            <IconButton
              aria-label="Return to homepage"
              icon={<ArrowBackIcon />}
              onClick={() => router.push("/")}
            />
          </div>
        </AlertDescription>
      </Alert>
    </main>
  );
};

export default Error;

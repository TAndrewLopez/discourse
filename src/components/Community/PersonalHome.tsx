import { authModalState } from "@/atoms/authModalAtom";
import useDirectory from "@/hooks/useDirectory";
import { Button, Flex, Icon, Stack, Text } from "@chakra-ui/react";
import { auth } from "@/firebase/clientApp";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { FaReddit } from "react-icons/fa";
import { useSetRecoilState } from "recoil";

const PersonalHome: React.FC = () => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const setAuthModalState = useSetRecoilState(authModalState);
  const { toggleMenuOpen } = useDirectory();

  const handleClick = () => {
    if (!user) {
      setAuthModalState({ open: true, view: "login" });
      return;
    }
    const { communityId } = router.query;
    if (communityId) {
      router.push(`/r/${communityId}/submit`);
    }
    toggleMenuOpen();
  };

  return (
    <Flex
      direction="column"
      bg="white"
      borderRadius={4}
      // cursor="pointer"
      border="1px solid"
      borderColor="gray.300"
      position="sticky">
      <Flex
        align="flex-end"
        color="white"
        p="6px 10px"
        bg="blue.500"
        height="62px"
        borderRadius="4px 4px 0px 0px"
        fontWeight={600}
        bgImage="url(/images/personalBanner.png)"
        bgSize="cover"></Flex>
      <Flex direction="column" p="12px">
        <Flex align="center" mb={2}>
          <Icon as={FaReddit} fontSize={50} color="brand.100" mr={2} />
          <Text fontWeight={600}>Home</Text>
        </Flex>
        <Stack spacing={3}>
          <Text fontSize="9pt">
            Your personal Reddit front page, built for you.
          </Text>

          <Button onClick={handleClick} name="post" height="30px">
            Create Post
          </Button>
          <Button
            onClick={handleClick}
            name="community"
            variant="outline"
            height="30px">
            Create Community
          </Button>
        </Stack>
      </Flex>
    </Flex>
  );
};

export default PersonalHome;

import { useUser } from "@/lib/hooks/use-user";

const MyAvatar = () => {
  const { user } = useUser();
  return (
    <div className="relative">
      <div className="border-2 border-white rounded-full overflow-hidden">
        <img
          src={user?.profilePictureBase64 ? "data:image/*;base64, " + user.profilePictureBase64 : "/user-default.svg"}
          className="w-14 h-14 object-cover"
          alt="user avatar"
        />
      </div>
      <div className="absolute left-0 bottom-0 rounded-full border-2 border-white bg-[#C0DE60] w-5 h-5"></div>
    </div>
  );
};

export default MyAvatar;

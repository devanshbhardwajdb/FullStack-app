"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const PromptCard = ({ post, handleEdit, handleDelete, handleTagClick }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const [copied, setCopied] = useState("");

  const handleProfileClick = () => {
    console.log(post);

    if (post.creator._id === session?.user.id) return router.push("/profile");

    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
  };

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <div className='prompt_card break-words'>
      <div className='flex justify-between items-start gap-5'>
        <div
          className='flex-1 flex justify-start items-center gap-3 cursor-pointer'
          onClick={handleProfileClick}
        >
          <Image
            src={post.creator.image}
            alt='user_image'
            width={40}
            height={40}
            className='rounded-full object-contain'
          />

          <div className='flex flex-col'>
            <h3 className='font-satoshi font-semibold text-gray-200 break-all'>
              {post.creator.username}
            </h3>
            <p className='font-inter text-sm text-gray-400 break-all '>
              {post.creator.email}
            </p>
          </div>
        </div>

        <div className='copy_btn' onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.png"
            }
            alt={copied === post.prompt ? "tick_icon" : "copy_icon"}
            width={12}
            height={12}
          />
        </div>
      </div>

      <p className='my-4 font-satoshi text-sm text-gray-200'>{post.prompt}</p>
      <p
        className='font-inter text-sm blue_gradient cursor-pointer'
        onClick={() => handleTagClick && handleTagClick(post.tag)}
      >
        #{post.tag}
      </p>


      {
        (session?.user.id === post.creator._id && pathName === "/profile") ? (
          <div className='mt-5 flex-between gap-4 border-t border-gray-500 pt-3'>
            <div className="flex flex-center gap-3 ">
              <p
                className='font-inter text-sm  cursor-pointer'

              >
                <Image src={"/assets/icons/heart.png"} width={25} height={25} className="invert_icons" ></Image>
              </p><p
                className='font-inter text-sm  cursor-pointer'

              >
                <Image src={"/assets/icons/comment.svg"} width={25} height={25} className="invert_icons"></Image>
              </p><p
                className='font-inter text-sm cursor-pointer'
              >
                <Image src={"/assets/icons/share.svg"} width={20} height={20} className="invert_icons"></Image>
              </p>
            </div>

            <div className="flex flex-center gap-5">
              <p
                className='font-inter text-sm green_gradient cursor-pointer'
                onClick={handleEdit}
              >
                <Image src={"/assets/icons/edit.svg"} width={20} height={20} className="invert_icons"></Image>
              </p>
              <p
                className='font-inter text-sm orange_gradient cursor-pointer'
                onClick={handleDelete}
              >
                <Image src={"/assets/icons/delete.svg"} width={20} height={20} className="invert_icons"></Image>
              </p>
            </div>
          </div>
        ) : (
          <div className='mt-5 flex-between gap-4 border-t border-gray-500 pt-3'>
            <div className="flex flex-center gap-3 ">
              <p
                className='font-inter text-sm  cursor-pointer'

              >
                <Image src={"/assets/icons/heart.png"} width={25} height={25} className="invert_icons"></Image>
              </p><p
                className='font-inter text-sm  cursor-pointer'

              >
                <Image src={"/assets/icons/comment.svg"} width={25} height={25} className="invert_icons"></Image>
              </p><p
                className='font-inter text-sm cursor-pointer'
              >
                <Image src={"/assets/icons/share.svg"} width={20} height={20} className="invert_icons"></Image>
              </p>
            </div>
            <div className="flex flex-center">

            </div>
          </div>
        )}
    </div>
  );
};

export default PromptCard;
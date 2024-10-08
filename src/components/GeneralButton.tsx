import Link from 'next/link';
import React from 'react';

type buttonProps = {
  href: string;
  text: string;
};

const GeneralButton = (props: buttonProps) => {
  return (
    <Link
      href={props.href}
      className="bg-blue-500 text-white px-4  py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
    >
      {props.text}
    </Link>
  );
};

export default GeneralButton;

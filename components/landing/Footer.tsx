import Link from "next/link";

export default function Footer() {

    const year = new Date().getFullYear();

    return (
        <footer className="bg-[#0a0a0a] pt-44 pb-8 text-white flex justify-center flex-col">

            <div className="py-16 w-full max-w-225 mx-auto flex items-center gap-6 text-sm justify-center">
                <Link
                    href={"/dashboard"}
                    className="hover:bg-primary px-3 py-0.5 rounded-lg"
                >
                    Start Editing
                </Link>
                <Link
                    href={"/About"}
                    className="hover:bg-primary px-3 py-0.5 rounded-lg"
                >
                    About
                </Link>
            </div>
            <div className="w-fit mx-auto flex flex-col gap-8">
                <h2 className="uppercase font-extrabold text-5xl lg:text-7xl xl:text-9xl text-primary relative cursor-default text-center">
                    Atlas Notes
                </h2>
                <div className="flex items-center justify-between">
                    <p className="text-xs">
                        &copy; {year} Atlas Notes. All rights reserved.
                    </p>
                    <p className="text-xs">
                        Made with ❤
                    </p>
                </div>
            </div>
        </footer>
    )
}
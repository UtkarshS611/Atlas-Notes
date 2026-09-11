import Link from "next/link";

export default function Footer() {

    const year = new Date().getFullYear();

    return (
        <footer className="bg-primary pt-44 pb-8 text-white flex justify-center flex-col">
            <div className="w-fit mx-auto flex flex-col gap-8">
                <h2 className="italic uppercase font-extrabold text-7xl xl:text-9xl relative cursor-default text-center">
                    Atlas Notes
                </h2>
                <div className="flex flex-col md:flex-row items-center justify-between gap-2">
                    <p className="text-xs">
                        &copy; {year} Atlas Notes. All rights reserved.
                    </p>
                    <p className="text-xs">
                        Made with 💙 by <a className="hover:underline" href="https://github.com/UtkarshS611">Utkarsh Singh</a>
                    </p>
                </div>
            </div>
        </footer>
    )
}
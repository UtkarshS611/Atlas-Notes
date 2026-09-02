import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowUp, CalendarCheck, FileText, Globe, Layout, Play, Plus, Signature, Sparkles, Target, User } from 'lucide-react'
import Image from 'next/image'

import {
    Avatar,
    AvatarFallback,
    AvatarGroup,
    AvatarGroupCount,
} from "@/components/ui/avatar";

export default function Features() {
    return (
        <section className="mx-auto w-full max-w-7xl px-6">
            <div className="py-24">
                <div className='mb-10'>
                    <h1 className='text-3xl font-semibold'>
                        Features
                    </h1>
                </div>
                <div className="w-full">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        <Card
                            className="col-span-full overflow-hidden pl-6 pt-6"
                        >
                            <Layout className="text-primary size-5" />
                            <h3 className="text-foreground mt-5 text-lg font-semibold">AI Code Generation</h3>
                            <p className="text-muted-foreground mt-3 max-w-xl text-balance">Our advanced AI models transform natural language into production-ready code, streamlining development workflows and enabling faster iteration. </p>
                            <div className="mask-b-from-95% -ml-2 -mt-2 mr-0.5 pl-2 pt-2">
                                <div className="bg-background rounded-tl-(--radius) ring-foreground/5 relative mx-auto mt-8 h-96 overflow-hidden border border-transparent shadow ring-1">
                                    <Image
                                        src="/hero/heroDemo.avif"
                                        alt="app screen"
                                        width="2880"
                                        height="1842"
                                        className="object-top-left h-full object-cover"
                                    />
                                </div>
                            </div>
                        </Card>
                        <Card
                            className="overflow-hidden p-6"
                        >
                            <User className="text-primary size-5" />
                            <h3 className="text-foreground mt-5 text-lg font-semibold">Multi User Collaboration</h3>
                            <p className="text-muted-foreground mt-3 text-balance">
                                Collaborate in real-time with your team. Share documents, leave comments, and track changes seamlessly.
                            </p>

                            <MeetingIllustration />
                        </Card>

                        <Card
                            className="group overflow-hidden px-6 pt-6"
                        >
                            <CalendarCheck className="text-primary size-5" />
                            <h3 className="text-foreground mt-5 text-lg font-semibold">
                                Seperate Private and Shared Workspaces
                            </h3>
                            <p className="text-muted-foreground mt-3 text-balance">
                                Keep your personal projects private while collaborating on shared documents with your team.
                            </p>

                            <CodeReviewIllustration />
                        </Card>
                        <Card
                            className="group overflow-hidden px-6 pt-6"
                        >
                            <Sparkles className="text-primary size-5" />
                            <h3 className="text-foreground mt-5 text-lg font-semibold">
                                State Saving and Persistence
                            </h3>
                            <p className="text-muted-foreground mt-3 text-balance">
                                Remember cursor positions, selections, and other stateful information across sessions, ensuring a seamless editing experience.
                            </p>
                            <div className="mask-b-from-50 -mx-2 -mt-2 px-2 pt-2">
                                <AIAssistantIllustration />
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    )
}

const MeetingIllustration = () => {

    const avatars = [
        { name: 'US' },
        { name: 'SB' },
        { name: 'MM' },
        { name: 'DM' },
    ]

    return (
        <Card
            aria-hidden
            className="mt-9 aspect-video p-4"
        >
            <div className="relative hidden h-fit">
                <div className="absolute -left-1.5 bottom-1.5 rounded-md border-t border-red-700 bg-red-500 px-1 py-px text-[10px] font-medium text-white shadow-md shadow-red-500/35">PDF</div>
                <div className="bg-linear-to-b h-10 w-8 rounded-md border from-zinc-100 to-zinc-200" />
            </div>
            <div className="mb-0.5 text-sm font-semibold">ML Strategy Discussion</div>
            <div className="mb-4 flex gap-2 text-sm">
                <span className="text-muted-foreground">2:30 - 3:45 PM</span>
            </div>
            <div className="mb-2 flex -space-x-1.5">
                <div className="flex -space-x-1.5">
                    <AvatarGroup>
                        {avatars.map((avatar, index) => (
                            <Avatar
                                key={index}
                                className="border-2 border-background"
                            >
                                <AvatarFallback
                                    className="text-xs font-medium text-white"
                                >
                                    {avatar.name}
                                </AvatarFallback>
                            </Avatar>
                        ))}
                    </AvatarGroup>
                </div>
            </div>
            <div className="text-muted-foreground text-sm font-medium">ML Project Doc</div>
        </Card>
    )
}

const CodeReviewIllustration = () => {
    return (
        <div
            aria-hidden
            className="relative mt-6"
        >
            <Card className="aspect-video w-4/5 translate-y-4 p-3 transition-transform duration-200 ease-in-out group-hover:-rotate-3">
                <div className="mb-3 flex items-center gap-2">
                    <FileText className='size-5' />
                    <span className="text-muted-foreground text-sm font-medium">Private</span>
                </div>

                <div className="ml-8 space-y-2">
                    <div className="bg-foreground/10 h-2 rounded-full" />
                    <div className="bg-foreground/10 h-2 w-3/5 rounded-full" />
                    <div className="bg-foreground/10 h-2 w-1/2 rounded-full" />
                </div>
            </Card>
            <Card className="aspect-3/5 absolute -top-4 right-0 flex w-2/5 translate-y-4 p-2 transition-transform duration-200 ease-in-out group-hover:rotate-3 ">
                <div className='flex items-center gap-2'>
                    <FileText className="size-5" />
                    <span className="text-muted-foreground text-sm font-medium">Shared</span>
                </div>
                <div className='flex flex-col items-start justify-start py-8 gap-2 w-full h-full'>
                    <div className="space-y-2">
                        <div className="bg-foreground/10 h-2 w-16 rounded-full" />
                        <div className="bg-foreground/10 h-2 w-13 rounded-full" />
                        <div className="bg-foreground/10 h-2 w-10 rounded-full" />
                    </div>
                </div>
            </Card>
        </div>
    )
}

const AIAssistantIllustration = () => {
    return (
        <Card
            aria-hidden
            className="mt-6 aspect-video translate-y-4 p-4 pb-6 transition-transform duration-200 group-hover:translate-y-0"
        >
            <div className="w-fit">
                <Sparkles className="size-3.5 fill-purple-300 stroke-purple-300" />
                <p className="mt-2 line-clamp-2 text-sm">
                    Full Persistance which allows changes to be saved and shared across sessions, ensuring that your work is never lost.
                </p>
            </div>
            <div className="space-y-2">
                <div className="bg-foreground/10 h-2 w-3/3 rounded-full" />
                <div className="bg-foreground/10 h-2 w-2/3 rounded-full" />
                <div className="bg-foreground/10 h-2 w-1/3 rounded-full" />
            </div>
        </Card>
    )
}

import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link, router, useForm} from '@inertiajs/react';
import {PageProps, Post, PostsProps} from '@/types';
import toast from "react-hot-toast";


export default function Dashboard({auth, posts}: PageProps<PostsProps>) {
    const {data, setData, post, processing, errors, reset, clearErrors} = useForm({
        body: '',
    })

    const submit = (e: { preventDefault: () => void; }) => {
        e.preventDefault()
        post(route('posts.store'), {
            onSuccess: () => {
                reset('body')

                toast.success('Post created successfully',{
                    position: 'top-right',
                })
            }
        })
    }

    const refreshPosts = () => {
        router.get(route('posts.index'), {}, {
            only: ['posts'],
            preserveScroll: true,
        })
    }


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Dashboard</h2>}
        >
            <Head title="Posts">
                <meta name="description" content="Posts Index"/>
            </Head>

            <div className="py-12">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8 space-y-3">
                    <form className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6" onSubmit={submit}>
                        <label form="body" className="sr-only">Body</label>
                        <textarea
                            name="body"
                            id="body"
                            rows={5}
                            cols={30}
                            className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm w-full"
                            onChange={(e) => setData('body', e.target.value)}
                            value={data.body}
                            onFocus={() => clearErrors('body')}
                        >
                    </textarea>
                        {errors.body && <div className="text-red-500">{errors.body}</div>}

                        <button type="submit"
                                className="mt-2 bg-gray-700 px-4 py-2 rounded-md font-medium text-white ${processing ? 'opacity-50' : ''}"
                                disabled={processing}
                        >
                            Post
                        </button>
                    </form>

                    <div className="py-3 flex justify-center">
                        <Link
                            href={route('posts.index')}
                            type='button'
                            only={['posts']}
                            preserveScroll={true}
                            className="bg-gray-700 px-4 py-2 rounded-md font-medium text-white"
                        >
                            Refresh posts
                        </Link>

                    </div>

                    {posts.data.map((post: Post) => {
                        return (
                            <div className=" bg-white overflow-hidden shadow-sm sm:rounded-lg" key={post.id}>
                                <div className="p-6 text-gray-900">
                                    <div className="font-semibold">
                                        {post.user.name}
                                    </div>
                                    <p className="mt-1">
                                        {post.body}
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

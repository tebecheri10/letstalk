import { redirect } from 'next/navigation'
import { fetchPostBySearchTerm } from '@/db/queries/posts';
import PostList from '@/components/posts/post-list';

interface SearchPageProps {
    searchParams: {
        term: string;
    };
 }

function SearchPage ({ searchParams }: SearchPageProps) {
    const { term } = searchParams;

    if (!term) {
        redirect('/');
    }

    return (
        <div className="space-y-3 pt-4">
            <h1>Search Results for {term}</h1>
            <PostList  fetchData={() => fetchPostBySearchTerm(term)} />
        </div>
    );
}

export default SearchPage;
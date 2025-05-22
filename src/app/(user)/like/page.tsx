import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'this is the like page',
    description: 'like page',
}


const LikePage = () => {
    return (
        <div>
            <h1>Like Page</h1>
            <p>This is the like page.</p>
        </div>
    );
}
export default LikePage;
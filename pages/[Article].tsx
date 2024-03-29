/* eslint-disable @next/next/no-sync-scripts */
// Import components from Next
import Head from "next/head";

// Import custom components
import { Footer, Header, ItemFull, TabBar } from "../components";

// Other imports
import { clientGraphQL, queryFindReplique } from "../utils";

interface PageArticleDetailsProps {
	replique: any;
	uid: any;
}
const PageArticleDetails = ({ replique }: PageArticleDetailsProps) => {
	return (
		<main>
			<Head>
				<script src="https://kit.fontawesome.com/ec5d791fc6.js"></script>
			</Head>

			<Header isHomePage={false} />

			<TabBar />

			<section>
				<h1>Nos répliques</h1>
				<div>
					<ItemFull
						itemGallery={replique.node.gallery}
						itemName={replique.node.name}
						itemPrice={replique.node.price}
						itemDescription={replique.node.product_description}
						itemContent={replique.node.product_content}
					/>
				</div>
			</section>

			<Footer isScroll={true} />
		</main>
	);
};

export async function getServerSideProps({ params }: { params: any }) {
	// const uid = (params?.path as string[])?.join('/') || 'PageShop';
	const uid = params.Article;
	const data = await clientGraphQL.query({
		query: queryFindReplique,
		variables: {
			uid,
		},
	});

	return {
		props: {
			replique: data.data.allArticles.edges[0],
		},
	};
}

export default PageArticleDetails;

import { Page, Badge, Thumbnail, Avatar, Layout, Card } from '@shopify/polaris';

import { useRouter } from 'next/router';

const test = [{ "name": "Amba", "city": "Sydney" },
{ "name": "Elwood", "city": "Buenos Aires" },
{ "name": "Cillian", "city": "London" }];


export default function userDetails() {

    const route = useRouter();

    // jredimer 
    const userId = parseInt(route.query.id);
    const user = test[userId] || {};

    return (
        <Page
            breadcrumbs={[{ content: 'Home', url: '/' }]}            
            title={"User " + user.name}
            subtitle={"id = " + userId}

            primaryAction={{ content: 'Save', disabled: true }}
            secondaryActions={[
                {
                    content: 'Duplicate',
                    accessibilityLabel: 'Secondary action label',
                    onAction: () => alert('Duplicate action'),
                },
                {
                    content: 'View on your store',
                    onAction: () => alert('View on your store action'),
                },
            ]}
            actionGroups={[
                {
                    title: 'Promote',
                    accessibilityLabel: 'Action group label',
                    actions: [
                        {
                            content: 'Share on Facebook',
                            accessibilityLabel: 'Individual action label',
                            onAction: () => alert('Share on Facebook action'),
                        },
                    ],
                },
            ]}
            pagination={{
                hasPrevious: true,
                hasNext: true,
            }}
            additionalNavigation={<Avatar size="small" initials="CD" customer={false} />}
            separator
        >
            <Layout>
                <Layout.Section>
                    <Card sectioned>
                        <ul>
                            <li>{"User " + user.name}</li>
                            <li>Email</li>
                        </ul>
                    </Card>
                </Layout.Section>
                <Layout.Section secondary>
                    <Card sectioned>
                        <p>Item purchased</p>
                        <p>Discount code</p>
                    </Card>
                </Layout.Section>
            </Layout>
        </Page>

    )
}


// getInitialProps will run before it page gets rendered
userDetails.getInitialProps = async (ctx, data) => {
    // you can add additional data to pageData
    let pageData = {};
    
    if(!data.shopOrigin) {
        if(typeof window !== "undefined") {
            window.location.href = "/test";
        } else {
            ctx.res.writeHead(302, { Location: '/test' })
        }
    }
    return { ...pageData }
}


import { Page, Badge, Thumbnail, Avatar, Layout, Card } from '@shopify/polaris';

import { useRouter } from 'next/router';

const test = [{ "name": "Amba", "city": "Sydney" },
{ "name": "Elwood", "city": "Buenos Aires" },
{ "name": "Cillian", "city": "London" }];


export default function userDetails() {

    const route = useRouter();

    return (
        <Page
            breadcrumbs={[{ content: 'Home', url: '/' }]}            
            title={"User " + test[parseInt(route.query.id)].name}
            subtitle={"id = " + route.query.id}

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
                            <li>{"User " + test[parseInt(route.query.id)].name}</li>
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


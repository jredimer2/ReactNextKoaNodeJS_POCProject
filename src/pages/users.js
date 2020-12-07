
import { Page, Badge, Thumbnail, Avatar, Layout, Card } from '@shopify/polaris'

var test = [{"name":"Amba Bain", "city": "Sydney"}, 
            {"name":"Elwood Bowes", "city":"Buenos Aires"},
            {"name":"Cillian Hampton", "city": "London"}];

console.log("----------------------- < Displaying user data 5 > -----------------------");
console.log(test[1].city);
console.log("----------------------- [ Displaying user data ] -----------------------");

export default function users() {
    var test = test[1].city;
    return (
        <Page
            breadcrumbs={[{ content: 'Home', url: '/' }]}
            title={users[1].city}
            titleMetadata={<Badge status="success">Paid</Badge>}
            subtitle="User 1"
            thumbnail={
                <Thumbnail
                    source="https://burst.shopifycdn.com/photos/black-leather-choker-necklace_373x@2x.jpg"
                    alt="Leather bracelet"
                />
            }
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
                            <li>Full Name</li>
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
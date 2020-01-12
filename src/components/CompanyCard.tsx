import * as React from 'react';
import { Card, CardContent, Typography, Avatar, CardHeader, Grid, Divider, Link } from '@material-ui/core'

interface ICompanyCardProps {
    companyProfile?: TCompanyProfile
}

const CompanyCard: React.FC<ICompanyCardProps> = ({ companyProfile }) => {
    if (companyProfile) {
        const { profile, symbol } = companyProfile
        const title = `${symbol} | ${profile.companyName}`
        const subheader = `sector: ${profile.sector}; industry: ${profile.industry}`

        return (
            <Card>
                <CardHeader
                    avatar={<Avatar src={profile.image} />}
                    title={title}
                    subheader={subheader}
                />
                <CardContent>
                    <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                    >

                        <Typography>
                            CEO: {profile.ceo}
                        </Typography>
                        <Typography>
                            Price: {profile.price}
                        </Typography>
                        <Typography>
                            Change: {profile.changes} {profile.changesPercentage}
                        </Typography>
                    </Grid>
                    <Divider />
                    <Typography>
                        {profile.description}
                    </Typography>
                    <Typography>
                        <Link href={profile.website} target="_blank" rel="noopener">
                            {profile.website}
                        </Link>
                    </Typography>
                </CardContent>
            </Card>
        )
    }
    return <div />
}

export default CompanyCard
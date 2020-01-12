import * as React from 'react';
import { observer, inject } from 'mobx-react';
import { Container } from '@material-ui/core'
import { SearchField, CompanyCard } from '../components'
import { IMainStore } from './Store';

interface IMainScreenProps {
    mainStore?: IMainStore;
}

@inject('mainStore')
@observer
class MainScreen extends React.Component<IMainScreenProps> {
    render() {
        const {
            companies,
            receiveCompanyProfile,
            companyProfile,
            handleSearchEvent,
            companiesIsloading
        } = this.props.mainStore!

        return (
            <Container>
                <SearchField
                    onChange={handleSearchEvent}
                    companies={companies}
                    onSelect={receiveCompanyProfile}
                    isLoading={companiesIsloading}
                />
                <CompanyCard companyProfile={companyProfile} />
            </Container>
        )
    }
}

export default MainScreen;
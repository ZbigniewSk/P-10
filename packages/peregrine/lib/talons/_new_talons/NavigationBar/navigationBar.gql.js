import { gql } from '@apollo/client';

const GET_ROOT_CATEGORY_ID = gql`
    query getRootCategoryId {
        storeConfig {
            id
            root_category_id
        }
    }
`

export default {
    getRootCategoryId: GET_ROOT_CATEGORY_ID
}

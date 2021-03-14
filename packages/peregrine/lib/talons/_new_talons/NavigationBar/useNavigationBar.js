import { useCallback, useEffect, useMemo, useState } from 'react'
import { useQuery } from '@apollo/client'

import mergeOperations from '../../../util/shallowMerge'
import { useCatalogContext } from '../../../context/catalog'

import DEFAULT_OPERATIONS from './navigationBar.gql'

export const useNavigationBar = (props = {}) => {
    const operations = mergeOperations(DEFAULT_OPERATIONS, props.operations)
    const { getCustomerQuery, getRootCategoryId } = operations
    const [catalogState, { actions: catalogActions }] = useCatalogContext()

    const { data: getRootCategoryData } = useQuery(getRootCategoryId, {
        fetchPolicy: 'cache-and-network'
    })

    const rootCategoryId = useMemo(() => {
        if (getRootCategoryData) {
            return getRootCategoryData.storeConfig.root_category_id;
        }
    }, [getRootCategoryData])

    const { categories } = catalogState
    const [categoryId, setCategoryId] = useState(rootCategoryId)

    useEffect(() => {
        // On a fresh render with cold cache set the current category as root
        // once the root category query completes.
        if (rootCategoryId && !categoryId) {
            setCategoryId(rootCategoryId)
        }
    }, [categoryId, rootCategoryId])

    // define local variables
    const category = categories[categoryId]
    const isTopLevel = categoryId === rootCategoryId

    return ({
        catalogActions,
        categoryId,
        categories
    })
}

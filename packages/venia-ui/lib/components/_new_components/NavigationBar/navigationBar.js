import { useNavigationBar } from '@magento/peregrine/lib/talons/_new_talons/NavigationBar/useNavigationBar'
import React from 'react'

const NavigationBar = props => {
    const { 
        catalogActions,
        categoryId,
        categories    
    } = useNavigationBar()

    console.log("categories: ", categories[categoryId])


    return (
        <div>
            {categoryId}
        </div>
    )
}

export default NavigationBar

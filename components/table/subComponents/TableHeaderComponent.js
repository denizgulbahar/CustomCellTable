import React from "react"
import HeaderCell from "../cellComponents/headerCell"
import { FlatList,Dimensions } from "react-native"

export const TableHeaderComponent = (({ data, colCount }) => {
    let tempData = data.headings
    let headerData = [...tempData]
    // console.log("head:",headerData)
    const HeaderItem = ({ item, index }) => (
      <HeaderCell kind="header" item={item} colCount={colCount}/>
    )

    return (
        <FlatList
          horizontal
          style={{ flex: 1 }}
          contentContainerStyle={{ flex: 1 }}
          data={headerData}
          renderItem={HeaderItem}
        />
    );
})
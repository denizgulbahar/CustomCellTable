import React from "react"
import { FlatList } from "react-native"
import TextCell from "../subComponents/cellComponents/textCell"

export const TableHeaderComponent = (({ data }) => {
    let tempData = data.headings
    let headerData = [...tempData]
    const HeaderItem = ({ item }) => (
      <TextCell item={item} />
    )

    return (
      <FlatList
        horizontal
        data={headerData}
        keyExtractor={(item, index) => `${item}_${index}`}
        style={{ flex: 1 }}
        contentContainerStyle={{ flex: 1 }}
        renderItem={HeaderItem}
      />
    );
})
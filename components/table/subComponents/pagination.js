import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const Pagination = ({data,setData}) => {
  const color = useContext(ThemeContext)

  const handlePageChange = (pageNumber) => {
    const newStartIndex = (pageNumber - 1) * data.itemsPerPage;
    const newEndIndex = newStartIndex + data.itemsPerPage;
    const newData = (data.query1 || data.query2 || data.query3 || data.query4) ? 
                      data.pagedData.slice(newStartIndex, newEndIndex) : 
                      data.currentData.slice(newStartIndex, newEndIndex);
    setData((prevData) => ({
      ...prevData,
      currentPage: pageNumber,
      startIndex: newStartIndex,
      endIndex: newEndIndex,
      pagedData: newData,
    }));
  };

  if (!data.pageNumbers) {
    return false;
  }
  let activePageStyle = {
    backgroundColor:color.darkBlueColor,
  }
  let pageNumberStyle = {
    color:color.whiteColor,
  }
  return (
    <View style={styles.pagination}>
      {data.pageNumbers.map((pageNumber) => (
        <TouchableOpacity
          key={pageNumber}
          style={[styles.pageItem,
            pageNumber === data.currentPage && activePageStyle,
          ]}
          onPress={() => handlePageChange(pageNumber)}
        >
            <Text style={[pageNumberStyle,{fontSize:16}]}>
              {pageNumber}
            </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};
const styles = StyleSheet.create({
  pagination: {
    height: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },  
  pageItem: {
    borderRadius: 5,
    width: 25,
    height: 25,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Pagination;
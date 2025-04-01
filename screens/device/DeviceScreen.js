import { Dimensions } from 'react-native'
import React,{ useState, useEffect } from 'react'
import ResponsiveTableCard from "../../components/tableCard/index";
import JSONData from '../../components/tableCard/tableCardFormat.json';
import deleteDeviceData from '../../API/delete-device'
import { ScreenWrapper } from '../../components/wrapper/screenWrapper';
import { dataSource } from '../../data/dataSource';
import formatTable from './formatTable';
import Loading from '../../components/loading/loading';

const TableScreen = () => {

  const [tableData, setTableData] = useState(JSONData)
  const [isLoadingTable, setIsLoading] = useState(true);

  async function handleDeleteTableData(item) {
    try {
      await deleteDeviceData(item)
      await handleListTableData();
    } catch (error) {
      console.error('Error handling table data:', error);
    }
  }
  async function handleListTableData() {
    try {
    const formattedData = await formatTable( dataSource, handleDeleteTableData)                
    setTableData(formattedData)
    } catch (error) {
      console.error('Error handling table data:', error);
    } finally {
      setIsLoading(false)
    }

  }
  
  useEffect(() => {
    setIsLoading(true);
    handleListTableData();
  }, []);
  
  return (
    <ScreenWrapper>
      {isLoadingTable && <Loading message="Tablo Yükleniyor, lütfen bekleyiniz..." />}
      <ResponsiveTableCard tableData={tableData} />
    </ScreenWrapper>
  )
}
export default TableScreen;

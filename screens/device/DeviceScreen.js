import { Dimensions } from 'react-native'
import React,{ useState, useEffect } from 'react'
import ResponsiveTableCard from "../../components/tableCard/index";
import JSONData from '../../components/tableCard/tableCardFormat.json';
import { ScreenWrapper } from '../../components/wrapper/screenWrapper';
import { dataSource } from '../../data/dataSource';
import formatTable from './formatTable';
import Loading from '../../components/loading/loading';

const TableScreen = () => {

  const [tableData, setTableData] = useState(JSONData)
  const [isLoadingTable, setIsLoading] = useState(true);
  async function handleListTableData(data) {
    try {
      const formattedData = await formatTable( data, handleDeleteTableData)                
      setTableData(formattedData)
    } catch (error) {
      console.error('Error handling table data:', error);
    } finally {
      setIsLoading(false)
    }

  }
  async function handleDeleteTableData(item) {
    try {
      // deviceName'e göre diziden ilgili öğeyi çıkar
      const updatedDevices = dataSource.filter(device => device.deviceName !== item.deviceName);
      
      // Güncellenmiş cihazları yazdır (burada API çağrısı yapılmadığı için direkt konsola yazdırılıyor)
      console.log(item);
      
      // Tabloyu tekrar güncelle (API ile yapılacak işlemi simüle ediyoruz)
      await handleListTableData(updatedDevices); 
    } catch (error) {
      console.error('Error handling table data:', error);
    } 
  }
  
  useEffect(() => {
    setIsLoading(true);
    handleListTableData(dataSource);
  }, []);
  
  return (
    <ScreenWrapper>
      {isLoadingTable && <Loading message="Tablo Yükleniyor, lütfen bekleyiniz..." />}
      <ResponsiveTableCard tableData={tableData} />
    </ScreenWrapper>
  )
}
export default TableScreen;

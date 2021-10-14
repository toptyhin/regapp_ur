<Page size="A4" style={styles.body}>
<Text style={[styles.bold,{textAlign:'center'}]}>{`Дополнительное соглашение № 1.`}</Text>
<Text style={[styles.bold,{textAlign:'center'}]}>{`к Агентскому соглашению №${props.contractno} от ${props.contractdate}.`}</Text>
<Text style={[styles.bold,{textAlign:'center'}]}>{`между ООО «Инфорком-Сервис» и ${props.company}`}</Text>
<View style={{display:'flex',justifyContent:'space-between',flexDirection:'row'}}>
      <Text>г. Москва</Text>
      <Text>{props.contractdate}</Text>
  </View>          
<Text style={styles.p}>ООО «Инфорком-Cервис», именуемое в дальнейшем «Агент», в лице коммерческого директора Редковой Татьяны Борисовны, действующего на основании Доверенности №2 от 11.01.2019г., с одной стороны, и АО "МЕГАФОН РИТЕЙЛ", именуемое в дальнейшем  «Принципал», в лице Генерального директора Левыкина Андрея Борисовича, действующего на основании Устава, с другой стороны, заключили настоящее Дополнительное соглашение о нижеследующем:</Text>
<Text style={styles.p}>1. Применять в отношениях сторон по вышеуказанному Соглашению на нефтепродукты следующие виды цен: Стандартная цена, Специальная цена, Индивидуальная цена, Особая цена. </Text>
<Text style={styles.p}>2. Стандартная цена применяется во всех случаях кроме тех, когда применяются Специальная цена, Индивидуальная цена, Особая цена.</Text>
<Text style={styles.p}>3. Специальная цена определяется исходя из текущей розничной цены, действующей на АЗС для клиентов по топливным картам ИНФОРКОМ на момент получения нефтепродуктов Принципалом. Специальная цена применяется в отношениях с Принципалом на дизельное топливо и бензин на АЗС, расположенных за пределами РФ и входящих в сеть ИНФОРКОМ на дату подписания настоящего Дополнительного соглашения.</Text>
<Text style={styles.p}>4. Индивидуальная цена применяется в отношениях с Принципалом на дизельное топливо и бензин на АЗС, расположенных за пределами РФ и входящих в сеть ИНФОРКОМ на дату подписания настоящего Дополнительного соглашения, полностью и своевременно выполняющим все условия настоящего Соглашения и имеющим объем потребления топлива  не менее 20 000 (двадцати тысяч) литров за каждый календарный месяц.</Text>
<Text style={styles.p}>5. Особая цена исчисляется путем уменьшения  Специальной цены на размер скидки. Размер скидки зависит от объёма потребления за предыдущий месяц, региона (место расположения АЗС), принадлежности АЗС, вида нефтепродукта. Значение размера скидки варьируется от 0 (нуля) до 1,00 (одного рубля) за 1 литр нефтепродукта от Специальной цены.</Text>
<Text style={styles.p}>Первоначальное значение размера скидки (размер скидки на дату подписания настоящего Дополнительного соглашения), указывается в таблице в п. 5 настоящего Дополнительного соглашения, а также отражается в Интернет-кабинете Принципала. </Text>
<Text style={styles.p}>Стороны согласовали условие о том, что в случае, если первоначальное значение размера скидки варьируется от 0 (нуля) до определенного значения (определено интервалом значений), конкретное значение размера скидки отражается на сайте Агента. Принципал обязан до подписания настоящего Дополнительного соглашения ознакомиться с размером скидок, предлагаемых Агентом. </Text>
<Text style={styles.p}>Далее (начиная со следующего дня после подписания настоящего Дополнительного соглашения) конкретное значение размера скидки устанавливается Агентом в одностороннем безакцептном порядке в пределах значений указанных выше и отражается в Интернет-кабинете Принципала. Принципал выражает согласие получать топливо по ценам, с учетом скидок, указанных в Интернет-кабинете Принципала, в соответствии с настоящим пунктом. </Text>

{/* table */}
<View style={[styles.table,{marginTop:10,marginBottom:10}]}>
  <View style={{width:'50%',borderTop:bs,borderLeft:bs}}></View>
  <View style={{width:'50%',borderTop:bs,borderLeft:bs,borderRight:bs,display:'flex',flexDirection:'column',fontSize:7}}>
      <Text style={{display:'block',width:'100%',textAlign:'center'}}>Объем потребления в месяц (литры)</Text>
      <Text style={{display:'block',borderTop:bs, width:'100%',textAlign:'center'}}>Размер скидки, рубли</Text>
  </View>

  <View style={{width:'50%',borderTop:bs, borderLeft:bs, display:'flex',flexDirection:'row'}}>
      <View style={{display:'flex',justifyContent:'center', alignContent:'center', width:'25%',fontSize:6}}><Text style={{textAlign:'center'}}>Регион (место расположения АЗС)</Text></View>
      <View style={{display:'flex',justifyContent:'center', alignContent:'center', borderLeft:bs,borderRight:bs, width:'25%',fontSize:6}}><Text style={{textAlign:'center'}}>Вид 
      нефтепродукта</Text></View>
      <View style={{display:'flex',justifyContent:'center', alignContent:'center',width:'50%',fontSize:6}}><Text style={{textAlign:'center'}}>Сеть АЗС</Text></View>
  </View>
  <View style={{width:'50%',borderLeft:bs,borderTop:bs,borderRight:bs, display:'flex',flexDirection:'row',fontSize:6}}>
      <View style={{display:'flex',justifyContent:'center', alignContent:'center',width:'25%'}}><Text style={{textAlign:'center'}}>0-5000</Text></View>
      <View style={{display:'flex',justifyContent:'center', alignContent:'center',width:'25%',borderLeft:bs}}><Text style={{textAlign:'center'}}>5001-10000</Text></View>
      <View style={{display:'flex',justifyContent:'center', alignContent:'center',width:'25%',borderLeft:bs}}><Text style={{textAlign:'center'}}>10001-20000</Text></View>
      <View style={{display:'flex',justifyContent:'center', alignContent:'center',width:'25%',borderLeft:bs}}><Text style={{textAlign:'center'}}>Более 20000</Text></View>
  </View>


  <View style={{width:'50%',borderTop:bs, borderLeft:bs, borderBottom:bs, display:'flex',flexDirection:'row'}}>
      <View style={{display:'flex',width:'25%',justifyContent:'center', alignContent:'center'}}>
          <Text style={{textAlign:'center',fontSize:7}}>АЗС, располо-
          женные на 
          территории РФ</Text>
      </View>
      
      {/* <View style={{display:'flex',width:'75%',justifyContent:'center', alignContent:'center'}}>

      </View> */}





      <View style={{display:'flex', flexDirection:'column',borderLeft:bs, width:'25%'}}>
              <Text style={{display:'block', borderBottom:bs, textAlign:'center',width:'100%',height: '20',fontSize:7}}>Дизельное топливо</Text>
              <Text style={{display:'block', borderBottom:bs, textAlign:'center',width:'100%',height: '10',fontSize:7}}>Бензин</Text>
              <Text style={{display:'block', borderBottom:bs, textAlign:'center',width:'100%',height: '10',fontSize:7}}>Газ</Text>
              <Text style={{display:'block', borderBottom:bs, textAlign:'center',width:'100%',height: '20',fontSize:7}}>Дизельное топливо</Text>
              <Text style={{display:'block', borderBottom:bs, textAlign:'center',width:'100%',height: '10',fontSize:7}}>Бензин</Text>
              <Text style={{display:'block', borderBottom:bs, textAlign:'center',width:'100%',height: '10',fontSize:7}}>Газ</Text>
              <Text style={{display:'block', borderBottom:bs, textAlign:'center',width:'100%',height: '20',fontSize:7}}>Дизельное топливо</Text>
              <Text style={{display:'block', borderBottom:bs, textAlign:'center',width:'100%',height: '10',fontSize:7}}>Бензин</Text>
              <Text style={{display:'block', textAlign:'center',width:'100%',height: '10',fontSize:7}}>Газ</Text>                        
      </View>
      <View style={{display:'flex', flexDirection:'column',borderLeft:bs, width:'50%',fontSize:6}}>
              <Text style={{display:'block', borderBottom:bs, textAlign:'center',width:'100%',height: '40'}}>АЗС, входящие в сеть ИНФОРКОМ, кроме АЗС «Газпром нефть» и АЗС, указанных на сайте Агента по адресу: http://inforkom.ru/map-stations/isklyuchennye-2</Text>
              <Text style={{display:'block', borderBottom:bs, textAlign:'center',width:'100%',height: '40'}}>АЗС, указанные на сайте Агента по адресу: http://inforkom.ru/map-stations/isklyuchennye-2</Text>
              <Text style={{display:'block', textAlign:'center',width:'100%',height: '40'}}>АЗС «Газпром нефть»</Text>
      </View>
  </View>
  <View style={{width:'50%',borderLeft:bs,borderTop:bs,borderRight:bs, display:'flex',flexDirection:'row',fontSize:7}}>
      <View style={{display:'flex',flexDirection:'column',width:'25%'}}>
              <View style={{display:'flex',justifyContent:'center', alignContent:'center',borderBottom:bs, width:'100%',height:'20'}}><Text style={{textAlign:'center'}}>0.30</Text></View>
              <Text style={{display:'block', borderBottom:bs, textAlign:'center',width:'100%',height:'10'}}>0.30</Text>
              <Text style={{display:'block', borderBottom:bs, textAlign:'center',width:'100%',height:'10'}}>0.00</Text>
              <View style={{display:'flex',justifyContent:'center', alignContent:'center',borderBottom:bs, width:'100%',height:'20'}}><Text style={{textAlign:'center'}}>0.00</Text></View>
              <Text style={{display:'block', borderBottom:bs, textAlign:'center',width:'100%',height:'10'}}>0.00</Text>
              <Text style={{display:'block', borderBottom:bs, textAlign:'center',width:'100%',height:'10'}}>0.00</Text>
              <View style={{display:'flex',justifyContent:'center', alignContent:'center',borderBottom:bs, width:'100%',height:'20'}}><Text style={{textAlign:'center'}}>0.40</Text></View>
              <Text style={{display:'block', borderBottom:bs, textAlign:'center',width:'100%',height:'10'}}>0.40</Text>
              <Text style={{display:'block', borderBottom:bs, textAlign:'center',width:'100%',height:'10'}}>0.00</Text>
      </View>
      <View style={{display:'flex',flexDirection:'column',borderLeft:bs, width:'25%'}}>
              <View style={{display:'flex',justifyContent:'center', alignContent:'center',borderBottom:bs, width:'100%',height:'20'}}><Text style={{textAlign:'center'}}>0.50</Text></View>
              <Text style={{display:'block', borderBottom:bs, textAlign:'center',width:'100%',height:'10'}}>0.50</Text>
              <Text style={{display:'block', borderBottom:bs, textAlign:'center',width:'100%',height:'10'}}>0.00</Text>
              <View style={{display:'flex',justifyContent:'center', alignContent:'center',borderBottom:bs, width:'100%',height:'20'}}><Text style={{textAlign:'center'}}>0.00</Text></View>
              <Text style={{display:'block', borderBottom:bs, textAlign:'center',width:'100%',height:'10'}}>0.00</Text>
              <Text style={{display:'block', borderBottom:bs, textAlign:'center',width:'100%',height:'10'}}>0.00</Text>
              <View style={{display:'flex',justifyContent:'center', alignContent:'center',borderBottom:bs, width:'100%',height:'20'}}><Text style={{textAlign:'center'}}>0.40</Text></View>
              <Text style={{display:'block', borderBottom:bs, textAlign:'center',width:'100%',height:'10'}}>0.40</Text>
              <Text style={{display:'block', borderBottom:bs, textAlign:'center',width:'100%',height:'10'}}>0.00</Text>
      </View>
      <View style={{display:'flex',flexDirection:'column',borderLeft:bs,width:'25%'}}>
              <View style={{display:'flex',justifyContent:'center', alignContent:'center',borderBottom:bs,width:'100%',height:'20'}}><Text style={{textAlign:'center'}}>0.60</Text></View>
              <Text style={{display:'block', borderBottom:bs, textAlign:'center',width:'100%',height:'10'}}>0.60</Text>
              <Text style={{display:'block', borderBottom:bs, textAlign:'center',width:'100%',height:'10'}}>0.20</Text>
              <View style={{display:'flex',justifyContent:'center', alignContent:'center',borderBottom:bs, width:'100%',height:'20'}}><Text style={{textAlign:'center'}}>0.00</Text></View>
              <Text style={{display:'block', borderBottom:bs, textAlign:'center',width:'100%',height:'10'}}>0.00</Text>
              <Text style={{display:'block', borderBottom:bs, textAlign:'center',width:'100%',height:'10'}}>0.00</Text>
              <View style={{display:'flex',justifyContent:'center', alignContent:'center',borderBottom:bs, width:'100%',height:'20'}}><Text style={{textAlign:'center'}}>0.40</Text></View>
              <Text style={{display:'block', borderBottom:bs, textAlign:'center',width:'100%',height:'10'}}>0.40</Text>
              <Text style={{display:'block', borderBottom:bs, textAlign:'center',width:'100%',height:'10'}}>0.00</Text>
      </View>
      <View style={{display:'flex',flexDirection:'column',borderLeft:bs,width:'25%'}}>
              <View style={{display:'flex',justifyContent:'center', alignContent:'center',borderBottom:bs, width:'100%',height:'20'}}><Text style={{textAlign:'center'}}>1.00</Text></View>
              <Text style={{display:'block', borderBottom:bs, textAlign:'center',width:'100%',height:'10'}}>1.00</Text>
              <Text style={{display:'block', borderBottom:bs, textAlign:'center',width:'100%',height:'10'}}>0.45</Text>
              <View style={{display:'flex',justifyContent:'center', alignContent:'center',borderBottom:bs, width:'100%',height:'20'}}><Text style={{textAlign:'center'}}>0.00</Text></View>
              <Text style={{display:'block', borderBottom:bs, textAlign:'center',width:'100%',height:'10'}}>0.00</Text>
              <Text style={{display:'block', borderBottom:bs, textAlign:'center',width:'100%',height:'10'}}>0.00</Text>
              <View style={{display:'flex',justifyContent:'center', alignContent:'center',borderBottom:bs, width:'100%',height:'20'}}><Text style={{textAlign:'center'}}>0.40</Text></View>
              <Text style={{display:'block', borderBottom:bs, textAlign:'center',width:'100%',height:'10'}}>0.40</Text>
              <Text style={{display:'block', borderBottom:bs, textAlign:'center',width:'100%',height:'10'}}>0.00</Text>
      </View>                                
  </View>   


</View>


<Text style={styles.p}>Особая цена применяется в отношениях с Принципалом на АЗС, расположенных на территории РФ и входящих в сеть ИНФОРКОМ на дату подписания настоящего Дополнительного соглашения и указанных в таблице, полностью и своевременно выполняющим все условия настоящего Соглашения.</Text>
<Text style={styles.p}>В случае несогласия с условиями, предложенными Агентом, Принципал обязан отказаться от получения услуг и воздержаться от подписания настоящего Дополнительного соглашения.</Text>
<Text style={styles.p}>6. Информация о Стандартной цене, Специальной цене, Индивидуальной цене, Особой цене размещена на сайте www.inforkom.ru в Интернет-кабинете Принципала. </Text>
<Text style={styles.p}>7. Принципал согласен с тем, что при невыполнении Принципалом условий вышеуказанного Соглашения Агент оставляет за собой право в одностороннем порядке возвратиться к применению или впервые применить в отношениях с Принципалом Стандартную цену, начиная с любого дня, следующего за днем указанного невыполнения условий, без  письменного оформления возврата к Стандартной цене и без обязательства Агента применять Специальную цену, Индивидуальную цену, Особую цену когда-либо в будущем. </Text>
<Text style={styles.p}>8. В случае изменения конъюнктуры рыночных цен на топливном рынке, изменения отпускных цен у собственников  нефтепродуктов и иных управомоченных отчуждателей Агент имеет право в одностороннем безакцептном порядке не предоставлять Принципалу скидки, указанные в п. 5, 6 настоящего дополнительного соглашения, и возвратиться к применению или впервые применить в отношениях с Принципалом Специальную цену, начиная с любого дня, следующего за днем указанного изменения, без  письменного оформления возврата к Специальной цене и без обязательства Агента применять Особую цену когда-либо в будущем.</Text>
<Text style={styles.p}>9. Настоящее дополнительное соглашение вступает в силу с момента подписания Сторонами.</Text>
{signatures()}
{footer()}   
</Page>        
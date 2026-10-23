import { View } from 'react-native';
import DespesaLista from './DespesaLista';
import DespesaSumario from './DespesaSumario';

export default function DespesaSaida({
  expenses,
  navigation,
  themeColors,
  count,
  total,
  listHeaderComponent,
  emptyTitle,
  emptyMessage,
  emptyIcon,
  keyboardShouldPersistTaps,
}) {
  return (
    <DespesaLista
      expenses={expenses}
      navigation={navigation}
      themeColors={themeColors}
      ListHeaderComponent={
        <View>
          {listHeaderComponent}
          <DespesaSumario count={count} total={total} themeColors={themeColors} />
        </View>
      }
      emptyTitle={emptyTitle}
      emptyMessage={emptyMessage}
      emptyIcon={emptyIcon}
      keyboardShouldPersistTaps={keyboardShouldPersistTaps}
    />
  );
}

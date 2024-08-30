import React, { useMemo, useState } from 'react';
import { ChipItem, Comparator, SalesDataItem, SalesDataRow } from '../../../types/typings';
import './index.css';
import { Chip } from '../../atoms/Chip';
import { InlineInput } from '../../atoms/InlineInput';
import { Option } from '../../../types/utilities';

export const Filter: React.FC<{ data: SalesDataRow[] }> = ({ data }) => {
  const [chips, setChips] = useState<ChipItem[]>([]);

  const { fields, normalized } = useMemo<{ fields: Option[]; normalized: Record<string, SalesDataItem> }>(() => {
    // gathering all fields to store in obj
    const normalizedData = data.reduce<Record<string, SalesDataItem>>((acc, cur) => {
      return cur.items.reduce((accItems, curItem) => {
        if (!accItems[curItem.alias]) {
          accItems[curItem.alias] = curItem;
        }
        return accItems;
      }, acc);
    }, {});

    return {
      fields: Object.values(normalizedData)
        .filter(f => !chips.find(c => c.alias === f.alias))
        .map(c => ({ label: c.name, value: c.alias })),
      normalized: normalizedData,
    };
  }, [chips, data]);

  const onOptionSelected = (option: Option) => {
    setChips(currentChips => {
      const currentIndex = currentChips.findIndex(c => c.alias === option.value);

      if (currentIndex === -1) {
        const newItem = normalized[option.value];

        if (newItem) {
          return [...currentChips, newItem];
        }
      }

      return currentChips;
    });
  };

  const onRemoveChip = (alias: string) => {
    setChips(currentChips => {
      const currentIndex = currentChips.findIndex(c => c.alias === alias);

      if (currentIndex !== -1) {
        const arr = [...currentChips];
        arr.splice(currentIndex, 1);

        return arr;
      }

      return currentChips;
    });
  };

  const onChangeSelectorValue = (alias: string, value: string) => {
    setChips(currentChips => {
      const currentIndex = currentChips.findIndex(c => c.alias === alias);

      if (currentIndex !== -1) {
        const arr = JSON.parse(JSON.stringify(currentChips)) as ChipItem[];

        if (!arr[currentIndex]?.selector) {
          arr[currentIndex].selector = {};
        }

        const obj = arr[currentIndex].selector;

        if (obj) {
          obj.value = value;
        }

        return arr;
      }

      return currentChips;
    });
  };

  const onChangeSelectorComparator = (alias: string, comparator: Comparator) => {
    setChips(currentChips => {
      const currentIndex = currentChips.findIndex(c => c.alias === alias);

      if (currentIndex !== -1) {
        const arr = JSON.parse(JSON.stringify(currentChips)) as ChipItem[];

        if (!arr[currentIndex]?.selector) {
          arr[currentIndex].selector = {};
        }

        const obj = arr[currentIndex].selector;

        if (obj) {
          obj.comparator = comparator;
        }

        return arr;
      }

      return currentChips;
    });
  };

  return (
    <div className="filter-container">
      <div className="filter-label-block">Filter</div>
      <div className="filter-input-block">
        {chips.map(c => {
          return (
            <Chip
              key={c.alias}
              item={c}
              onRemove={onRemoveChip}
              onChangeValue={onChangeSelectorValue}
              onSelectComparator={onChangeSelectorComparator}
            />
          );
        })}

        <InlineInput fields={fields} onSelected={onOptionSelected} />
      </div>
    </div>
  );
};

import type React from 'react';
import { Button, Slider, Space, Typography, Popover, Card } from 'antd';
import { SettingOutlined } from '@ant-design/icons';

const { Text } = Typography;

interface SplitterControlsProps {
  splitterSize: (string | number)[];
  setSplitterSize: (size: (string | number)[]) => void;
}

export const SplitterControls: React.FC<SplitterControlsProps> = ({
  splitterSize,
  setSplitterSize,
}) => {
  const getSliderValue = () => {
    const leftSize = splitterSize[0];
    if (typeof leftSize === 'string' && leftSize.includes('%')) {
      return Number.parseInt(leftSize.replace('%', ''));
    }
    return 70;
  };

  const handleSliderChange = (value: number) => {
    setSplitterSize([`${value}%`, `${100 - value}%`]);
  };

  const presetSizes = [
    { label: 'Map Focus', value: [75, 25] },
    { label: 'Balanced', value: [50, 50] },
    { label: 'List Focus', value: [35, 65] },
  ];

  const controlsContent = (
    <Card size='small' style={{ width: 280 }}>
      <Space direction='vertical' style={{ width: '100%' }}>
        <div>
          <Text strong>Panel Size Control</Text>
          <Slider
            min={20}
            max={80}
            value={getSliderValue()}
            onChange={handleSliderChange}
            marks={{
              20: '20%',
              50: '50%',
              80: '80%',
            }}
            tooltip={{
              formatter: (value) =>
                `Map: ${value}% / Riders: ${100 - (value || 0)}%`,
            }}
          />
        </div>

        <div>
          <Text strong>Quick Presets</Text>
          <div style={{ marginTop: 8 }}>
            <Space wrap>
              {presetSizes.map((preset) => (
                <Button
                  key={preset.label}
                  size='small'
                  onClick={() =>
                    setSplitterSize([
                      `${preset.value[0]}%`,
                      `${preset.value[1]}%`,
                    ])
                  }
                  type={
                    getSliderValue() === preset.value[0] ? 'primary' : 'default'
                  }
                >
                  {preset.label}
                </Button>
              ))}
            </Space>
          </div>
        </div>
      </Space>
    </Card>
  );

  return (
    <Popover
      content={controlsContent}
      title='Layout Controls'
      trigger='click'
      placement='bottomRight'
    >
      <Button icon={<SettingOutlined />} />
    </Popover>
  );
};

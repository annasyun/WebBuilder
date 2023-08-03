import React from 'react';

import ApplyTable from 'components/Editor/ApplyTable';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWandMagicSparkles, faImage, faPaperclip } from '@fortawesome/free-solid-svg-icons';

export const EditorRenderBox = {
  image: (box, block_id, blockStyle) => {
    const filter_style = blockStyle?.find((block) => block.block_id === block_id);

    const isCircle = box.style.borderRadius === '50%';
    const containerWidth = filter_style?.style?.maxWidth || '1240px'; // module_wrap의 maxWidth 값을 가져옵니다.
    const imageWidth = `calc(${containerWidth} / ${box?.numImages} - 40px)`; // 각 이미지의 너비를 계산합니다.

    const imageBoxStyle = {
      position: 'relative',
      width: imageWidth,
      height: isCircle ? imageWidth : '300px', // 원형 이미지의 높이를 너비와 동일하게 설정합니다.
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      overflow: 'hidden',
      borderRadius: box.style.borderRadius || '10px',
      margin: '20px',
      background: 'rgba(0, 0, 0, 0.4)',
      ...box.style,
    };

    return (
      <div key={block_id} className='module_wrap' style={filter_style?.style}>
        <div className='module_container' style={box?.layout}>
          {[...Array(box?.numImages)].map((_, i) => (
            <div key={i} className='module_imageBox imgHover' style={imageBoxStyle}>
              <img src={box.src} alt='' style={{ width: '100%', height: '100%' }} />
              {/* <div className='module_imageBox imgHover'>
                {box?.src && <img src={box.src} alt='' />}
                <FontAwesomeIcon icon={faImage} size='3x' style={{ color: '#696969', position: 'relative', left: '60px' }} />
                <div className='module_image'>
                  <FontAwesomeIcon icon={faImage} style={{ color: '#ffffff', width: '50%' }} />
                </div>
                <div className='module_image'>
                  <FontAwesomeIcon icon={faPaperclip} style={{ color: '#ffffff', width: '50%' }} />
                </div>
              </div> */}
            </div>
          ))}
        </div>
      </div>
    );
  },
  line: (box, block_id, blockStyle) => {
    const filter_style = blockStyle?.find((block) => block.block_id === block_id);
    const isDotted = box?.style === 'dotted';
    return (
      <div key={block_id} className='module_wrap' style={filter_style?.style}>
        <div className='module_container_line'>
          <div
            style={{
              borderTop: isDotted ? 'none' : `${box?.thickness} ${box?.style} #B3B3B3`,
              backgroundImage: isDotted ? `radial-gradient(circle, rgb(179, 179, 179) 15%, transparent 0%)` : 'none',
              backgroundSize: isDotted ? '25px 100%' : 'auto',
              width: box?.length === 'long' ? '100%' : '15%',
              transform: box?.direction === 'diagonal' ? 'rotate(135deg)' : box?.direction === 'vertical' ? 'rotate(90deg)' : 'none',
              height: isDotted ? `${box.thickness}` : 'auto',
            }}
          />
        </div>
      </div>
    );
  },
  list: (box, block_id, blockStyle, handleUpdateText) => {
    let blockId, isLayout;
    if (block_id.includes('layout')) {
      [blockId, isLayout] = block_id.split('/');
    } else {
      blockId = block_id;
      isLayout = false;
    }

    const filter_style = blockStyle?.find((block) => block.block_id === block_id);
    return (
      <div key={block_id} className='module_wrap font-style' style={filter_style?.style}>
        <div className='module_container_list'>
          <div className='module_list_item'>
            <div className={`module_${box?.shape} imgHover`}>
              <img src={`${box?.src}`} alt='' />
            </div>
            {box?.lines &&
              box?.lines.map((line, lineIndex) => (
                <div
                  key={lineIndex}
                  contentEditable={true}
                  suppressContentEditableWarning
                  style={{ margin: line.margin, fontFamily: line.fontFamily || 'inherit', fontSize: line.fontSize, fontWeight: line.fontWeight, color: line.color }}
                  className={line.className}
                  onBlur={(e) => handleUpdateText(blockId, lineIndex, e.target.innerHTML, isLayout)}
                  dangerouslySetInnerHTML={{ __html: line.text }}
                />
              ))}
          </div>
        </div>
      </div>
    );
  },
  text: (box, block_id, blockStyle, handleUpdateText) => {
    let blockId, isLayout;
    if (block_id.includes('layout')) {
      [blockId, isLayout] = block_id.split('/');
    } else {
      blockId = block_id;
      isLayout = false;
    }

    const filter_style = blockStyle?.find((block) => block.block_id === blockId);
    return (
      <div key={blockId} className='module_wrap' style={filter_style?.style}>
        <div className='module_container' style={{ textAlign: `${box?.alignments}` }}>
          <div className='module_text_item'>
            {box?.lines.map((line, i) => (
              <React.Fragment key={i}>
                <div
                  key={i}
                  className='module_text_line'
                  contentEditable={true}
                  suppressContentEditableWarning
                  style={{ margin: line.margin, fontSize: line.fontSize, color: line.color, fontWeight: line.fontWeight }}
                  onBlur={(e) => handleUpdateText(blockId, i, e.target.innerHTML, isLayout)}
                  dangerouslySetInnerHTML={{ __html: line.text }}
                ></div>
                {line.button && <button className={line.buttonStyle}>{line.button}</button>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    );
  },
  table: null,
  layout: (box, block_id, blockStyle, handleUpdateText, layout_design, clickHandler, setIsLayoutDesign, setLayoutId) => {
    const filter_style = blockStyle?.find((block) => block.block_id === block_id);
    const parsed_layout_design = layout_design ? JSON.parse(layout_design) : null;

    return (
      <div key={block_id} className='module_wrap' style={filter_style?.style}>
        <div className='module_container'>
          <div className='module_layout_item' style={box?.style}>
            {box?.elements.map((element, i) => {
              const layout = parsed_layout_design && parsed_layout_design?.find((e) => e.layout_id === element.layout_id);
              const layout_design_type = layout && layout?.design_type;
              const layout_design_id = layout && layout?.design_id;
              const layout_boxes = layout && layout?.boxes;

              let boxes, index, tableDesignId;
              if (layout_design_type !== 'table') {
                boxes = layout_boxes ? layout_boxes : undefined;
                index = `${block_id}/layout_${element.layout_id}`;
              } else {
                tableDesignId = layout_design_id;
              }

              return (
                <div
                  key={i}
                  className={element.children ? '' : layout ? '' : 'module_layoutBox'}
                  style={element.style}
                  onClick={
                    layout
                      ? null
                      : (e) => {
                          e.stopPropagation();
                          if (e.target !== e.currentTarget) {
                            clickHandler();
                            setIsLayoutDesign(true);
                            setLayoutId(element.layout_id);
                          }
                        }
                  }
                >
                  {element.children ? (
                    element.children.map((child, j) => {
                      const layout_child = parsed_layout_design && parsed_layout_design.find((e) => e.layout_id === child.layout_id);
                      const layout_child_design_type = layout_child && layout_child.design_type;
                      const layout_child_design_id = layout_child && layout_child.design_id;
                      const layout_child_boxes = layout_child && layout_child.boxes;

                      let child_boxes, child_index;
                      if (layout_child_design_type !== 'table') {
                        child_boxes = layout_child_boxes ? layout_child_boxes : undefined;
                        child_index = `${block_id}/layout_${element.layout_id}`;
                      } else {
                        tableDesignId = layout_child_design_id;
                      }

                      return (
                        <div
                          key={j}
                          className={layout_child ? '' : 'module_layoutBox'}
                          style={child.style}
                          onClick={
                            layout_child
                              ? null
                              : (e) => {
                                  e.stopPropagation();
                                  if (e.target !== e.currentTarget) {
                                    clickHandler();
                                    setIsLayoutDesign(true);
                                    setLayoutId(child.layout_id);
                                  }
                                }
                          }
                        >
                          {layout_child ? (
                            layout_child_design_type === 'image' ? (
                              EditorRenderBox.image(child_boxes, child_index, (blockStyle = null))
                            ) : layout_child_design_type === 'text' ? (
                              EditorRenderBox.text(child_boxes, child_index, (blockStyle = null), handleUpdateText)
                            ) : layout_child_design_type === 'list' ? (
                              EditorRenderBox.list(child_boxes, child_index, (blockStyle = null), handleUpdateText)
                            ) : layout_child_design_type === 'table' ? (
                              <ApplyTable design_id={tableDesignId} />
                            ) : layout_child_design_type === 'line' ? (
                              EditorRenderBox.line(child_boxes, child_index, (blockStyle = null))
                            ) : null
                          ) : (
                            <ClickDiv />
                          )}
                        </div>
                      );
                    })
                  ) : layout ? (
                    layout_design_type === 'image' ? (
                      EditorRenderBox.image(boxes, index, (blockStyle = null))
                    ) : layout_design_type === 'text' ? (
                      EditorRenderBox.text(boxes, index, (blockStyle = null), handleUpdateText)
                    ) : layout_design_type === 'list' ? (
                      EditorRenderBox.list(boxes, index, (blockStyle = null), handleUpdateText)
                    ) : layout_design_type === 'table' ? (
                      <ApplyTable design_id={tableDesignId} />
                    ) : layout_design_type === 'line' ? (
                      EditorRenderBox.line(boxes, index, (blockStyle = null))
                    ) : null
                  ) : (
                    <ClickDiv />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  },
  // 필요한 만큼 추가
};

const ClickDiv = () => {
  return (
    <div className='layout_wrap'>
      <FontAwesomeIcon className='icon_design_select' icon={faWandMagicSparkles} />
      <p className='txt_design_select'>디자인을 선택하세요</p>
    </div>
  );
};

// const EditToolbar = () => {
//   <div className='block_correction_btn' style={{ display: showBlockBtn === true ? 'flex' : 'none' }}>
//     <button className='block_function_btn'>
//       <span onClick={() => console.log('edit')}><FontAwesomeIcon icon={faEdit} /></span>
//     </button>
//     <button className='block_function_btn'>
//       <span onClick={() => console.log('rotate')}><FontAwesomeIcon icon={faArrowRotateRight} /></span>
//     </button>
//   </div>
// }

EditorRenderBox.defaultProps = {
  blockStyle: [],
};

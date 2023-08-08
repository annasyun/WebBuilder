import React from 'react';
import ApplyTable from 'components/Editor/ApplyTable';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWandMagicSparkles } from '@fortawesome/free-solid-svg-icons';
// import 'styles/Detail/Detail.css';
import 'styles/Detail/Detail.css';

export const DetailRenderBox = {
  image: ({ content, block_id, blockStyle }) => {
    console.log('content', content);
    let backgroundColor = 'revert';
    let restOfStyles = {
      maxWidth: '1240px',
      paddingTop: '0px',
      paddingBottom: '0px',
    };
    if (blockStyle) {
      restOfStyles = {
        maxWidth: blockStyle.style.maxWidth,
        paddingTop: blockStyle.style.paddingTop,
        paddingBottom: blockStyle.style.paddingBottom,
      };
      backgroundColor = blockStyle.style.backgroundColor || backgroundColor;
    }

    return (
      <div key={block_id} className='normal_wrap' style={{ backgroundColor: backgroundColor }}>
        <div className='module_wrap' style={restOfStyles}>
          <div className='module_container' style={content?.layout}>
            {[...Array(content?.images.length)].map((_, i) => {
              return (
                <div className='module_item' key={i} style={content?.style}>
                  <div className='module_imageBox' style={{ cursor: 'pointer' }}>
                    <img
                      src={`${content?.images[i].src}`}
                      alt=''
                      onClick={() => {
                        if (content?.images[i].href) {
                          window.location.href = content?.images[i].href;
                        }
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  },
  line: ({ box, block_id, blockStyle }) => {
    let backgroundColor = 'revert';
    let restOfStyles = {
      maxWidth: '1240px',
      paddingTop: '0px',
      paddingBottom: '0px',
    };
    if (blockStyle) {
      restOfStyles = {
        maxWidth: blockStyle.style.maxWidth,
        paddingTop: blockStyle.style.paddingTop,
        paddingBottom: blockStyle.style.paddingBottom,
      };
      backgroundColor = blockStyle.style.backgroundColor || backgroundColor;
    }
    const isDotted = box?.style === 'dotted';
    return (
      <div key={block_id} className='normal_wrap' style={{ backgroundColor: backgroundColor }}>
        <div className='module_wrap' style={restOfStyles}>
          <div className='module_container_line_detail'>
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
      </div>
    );
  },
  list: ({ content, block_id, blockStyle }) => {
    let backgroundColor = 'revert';
    let restOfStyles = {
      maxWidth: '1240px',
      paddingTop: '0px',
      paddingBottom: '0px',
    };
    if (blockStyle) {
      restOfStyles = {
        maxWidth: blockStyle.style.maxWidth,
        paddingTop: blockStyle.style.paddingTop,
        paddingBottom: blockStyle.style.paddingBottom,
      };
      backgroundColor = blockStyle.style.backgroundColor || backgroundColor;
    }
    return (
      <div key={block_id} className='normal_wrap' style={{ backgroundColor: backgroundColor }}>
        <div className='module_wrap font-style' style={restOfStyles}>
          <div className='module_container_list'>
            <div className='module_list_item'>
              <div className={`module_${content?.shape}_detail`} style={{ cursor: 'pointer' }}>
                <img
                  src={`${content?.images[0].src}`}
                  alt=''
                  onClick={() => {
                    if (content?.images[0].href) {
                      window.location.href = content?.images[0].href;
                    }
                  }}
                />
              </div>
              {content?.lines &&
                content?.lines.map((line, lineIndex) => (
                  <div
                    key={lineIndex}
                    style={{ margin: line.margin, fontFamily: line.fontFamily || 'inherit', fontSize: line.fontSize, fontWeight: line.fontWeight, color: line.color }}
                    className={line.className}
                    dangerouslySetInnerHTML={{ __html: line.text }}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  },
  text: ({ content, block_id, blockStyle, handleUpdateText }) => {
    let blockId, isLayout;
    if (block_id?.includes('layout')) {
      [blockId, isLayout] = block_id.split('/');
    } else {
      blockId = block_id;
      isLayout = false;
    }

    let backgroundColor = 'revert';
    let restOfStyles = {
      maxWidth: '1240px',
      paddingTop: '0px',
      paddingBottom: '0px',
    };
    if (blockStyle) {
      restOfStyles = {
        maxWidth: blockStyle.style.maxWidth,
        paddingTop: blockStyle.style.paddingTop,
        paddingBottom: blockStyle.style.paddingBottom,
      };
      backgroundColor = blockStyle.style.backgroundColor || backgroundColor;
    }
    return (
      <div key={blockId} className='normal_wrap' style={{ backgroundColor: backgroundColor }}>
        <div className='module_wrap' style={restOfStyles}>
          <div className='module_container' style={{ textAlign: `${content?.alignments}` }}>
            <div className='module_text_item'>
              {content?.lines.map((line, i) => (
                <React.Fragment key={i}>
                  <div
                    key={i}
                    className='module_text_line'
                    style={{ margin: line.margin, fontSize: line.fontSize, color: line.color, fontWeight: line.fontWeight }}
                    dangerouslySetInnerHTML={{ __html: line.text }}
                  ></div>
                  {line.button && <button className={line.buttonStyle}>{line.button}</button>}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  },
  table: null,
  layout: ({ content, block_id, blockStyle, handleUpdateText, layout_design, clickHandler, setIsLayoutDesign, setLayoutId }) => {
    console.log(content, 'layout');
    let backgroundColor = 'revert';
    let restOfStyles = {
      maxWidth: '1240px',
      paddingTop: '0px',
      paddingBottom: '0px',
    };
    if (blockStyle) {
      restOfStyles = {
        maxWidth: blockStyle.style.maxWidth,
        paddingTop: blockStyle.style.paddingTop,
        paddingBottom: blockStyle.style.paddingBottom,
      };
      backgroundColor = blockStyle.style.backgroundColor || backgroundColor;
    }
    const parsed_layout_design = layout_design ? JSON.parse(layout_design) : null;
    return (
      <div key={block_id} className='normal_wrap' style={{ backgroundColor: backgroundColor }}>
        <div className='module_wrap' style={restOfStyles}>
          <div className='module_container'>
            <div className='module_layout_item' style={content?.style}>
              {content?.elements.map((element, i) => {
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
                                DetailRenderBox.image({ child_boxes, child_index })
                              ) : layout_child_design_type === 'text' ? (
                                DetailRenderBox.text({ child_boxes, child_index, handleUpdateText })
                              ) : layout_child_design_type === 'list' ? (
                                DetailRenderBox.list({ child_boxes, child_index, handleUpdateText })
                              ) : layout_child_design_type === 'table' ? (
                                <ApplyTable design_id={tableDesignId} />
                              ) : layout_child_design_type === 'line' ? (
                                DetailRenderBox.line({ child_boxes, child_index })
                              ) : null
                            ) : (
                              <ClickDiv />
                            )}
                          </div>
                        );
                      })
                    ) : layout ? (
                      layout_design_type === 'image' ? (
                        DetailRenderBox.image({ content: boxes, block_id: index })
                      ) : layout_design_type === 'text' ? (
                        DetailRenderBox.text({ content: boxes, block_id: index, handleUpdateText })
                      ) : layout_design_type === 'list' ? (
                        DetailRenderBox.list({ content: boxes, block_id: index, handleUpdateText })
                      ) : layout_design_type === 'table' ? (
                        <ApplyTable design_id={tableDesignId} />
                      ) : layout_design_type === 'line' ? (
                        DetailRenderBox.line({ boxes, index })
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
      </div>
    );
  },
};

const ClickDiv = () => {
  return (
    <div className='layout_wrap'>
      <FontAwesomeIcon className='icon_design_select' icon={faWandMagicSparkles} />
      <p className='txt_design_select'>디자인을 선택하세요</p>
    </div>
  );
};

DetailRenderBox.defaultProps = {
  blockStyle: [],
};

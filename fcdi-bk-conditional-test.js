{
                                        data?.reason === "arif" || data?.reason === "hussain" ?
                                            <EditBox style={{ cursor: 'no-drop' }}>
                                                <span className="editIcon" ><EditIcon /> </span><span className="edit" >Add </span>
                                            </EditBox> :
                                            data?.isInvNoGenerated === "false" ?
                                                <EditBox onClick={addInvoiceNum}>
                                                    <span className="editIcon"><EditIcon /> </span><span className="edit"> Add </span>
                                                </EditBox>
                                                :
                                                <EditBox onClick={addInvoiceNum}>
                                                    <span className="editIcon"><EditIcon /> </span><span className="edit"> Edit </span>
                                                </EditBox>
                                    }

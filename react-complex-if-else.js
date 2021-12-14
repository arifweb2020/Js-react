{profileLOV.roleName === "arif" ? approvalDetailsData.data.approvalHeader.status === "Cancelled"
        && <StyledRemarksBox >
          <FormControl variant="outlined" style={{ width: '100%' }}>
            <StyledOutlinedInput
              type='text'
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="add remarks"
                    edge="end"
                    onClick={onSendClick}
                  >
                    <RemarksIcon />
                  </IconButton>
                </InputAdornment>
              }
              placeholder={approvalLabel.screenLables.addRemarks}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
          </FormControl>
        </StyledRemarksBox> :
        Object.keys(rejectQueryData).length == 0 && Object.keys(approveData).length == 0 ?
          <StyledRemarksBox >
            <FormControl variant="outlined" style={{ width: '100%' }}>
              <StyledOutlinedInput
                type='text'
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="type here"
                      edge="end"
                      onClick={onSendClick}
                    >
                      <RemarksIcon />
                    </IconButton>
                  </InputAdornment>
                }
                placeholder={approvalLabel.screenLables.typeHere}
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
            </FormControl>
          </StyledRemarksBox>
          :
          null
      }

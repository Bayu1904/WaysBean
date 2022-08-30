package authdto

type AuthRequest struct {
	Name     string `gorm:"type: varchar(255)" json:"name" validate:"required"`
	Email    string `gorm:"type: varchar(255)" json:"email" validate:"required"`
	Password string `gorm:"type: varchar(255)" json:"password" validate:"required"`
	Status   string `gorm:"type: varchar(255)" json:"status"`
}

type LoginRequest struct {
	Email    string `gorm:"type: varchar(255)" json:"emailLogin" validate:"required"`
	Password string `gorm:"type: varchar(255)" json:"passwordLogin" validate:"required"`
}
